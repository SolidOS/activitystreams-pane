import * as React from 'react'
import { render, act } from '@testing-library/react'
import { useNote } from '../../../src/note/useNote'
import { sym } from 'rdflib'
import { store } from 'solid-logic'
import { read } from '../../../src/note/store/note'
import { Note } from '../../../src/note/types'
// Remove direct import of fetchAttribution

jest.mock('../../../src/note/store/note')
jest.mock('../../../src/note/store/attribution')

describe('use note', () => {
  function HookTest ({ subject, store, onResult }: { subject: any, store: any, onResult: (note: Note) => void }) {
    const note = useNote(subject, store)
    React.useEffect(() => {
      onResult(note)
    }, [note])
    return null
  }

  describe('GIVEN a note with no attribution', () => {
    let result: Note | undefined
    beforeEach(() => {
      (read as jest.Mock<Note>).mockReturnValue({
        content: 'note content',
        attributedTo: {
          discriminator: 'NoAttribution',
        },
      })
      result = undefined
    })

    it('THEN the note is returned', async () => {
      await act(async () => {
        render(<HookTest subject={sym('https://pod.example/note#it')} store={store} onResult={note => { result = note }} />)
      })
      expect(result).toEqual({
        content: 'note content',
        attributedTo: {
          discriminator: 'NoAttribution',
        },
      })
    })
  })

  describe('GIVEN a note with attribution linked to a person', () => {
    let testResult: Note | undefined
    beforeEach(() => {
      (read as jest.Mock<Note>).mockReturnValue({
        content: 'note content',
        attributedTo: {
          discriminator: 'LinkAttribution',
          uri: 'https://pod.example/person#me',
        },
      })
      const fetchAttributionMock = require('../../../src/note/store/attribution').fetchAttribution as jest.Mock
      fetchAttributionMock.mockResolvedValue({
        discriminator: 'PersonAttribution',
        webId: 'https://pod.example/person#me',
        name: 'Jane Doe',
      })
      testResult = undefined
    })

    it('THEN the linked attribution is fetched', async () => {
      await act(async () => {
        render(<HookTest subject={sym('https://pod.example/note#it')} store={store} onResult={note => { testResult = note }} />)
      })
      const fetchAttributionMock = require('../../../src/note/store/attribution').fetchAttribution as jest.Mock
      expect(fetchAttributionMock).toHaveBeenCalledWith(
        {
          discriminator: 'LinkAttribution',
          uri: 'https://pod.example/person#me',
        },
        store
      )
    })

    it('AND the note is rendered with the fetched attribution', async () => {
      await act(async () => {
        render(<HookTest subject={sym('https://pod.example/note#it')} store={store} onResult={note => { testResult = note }} />)
      })
      expect(testResult).toEqual({
        content: 'note content',
        attributedTo: {
          discriminator: 'PersonAttribution',
          webId: 'https://pod.example/person#me',
          name: 'Jane Doe',
        },
      })
    })
  })
})
