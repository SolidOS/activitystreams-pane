import * as React from 'react'
import { ReactElement } from 'react'
import { createUseStyles } from 'react-jss'

import { Note } from './types'
import { FormattedDate } from './FormattedDate'
import { AttributionTag } from './AttributionTag'

const useStyles = createUseStyles({
  card: {
    fontFamily: 'sans-serif',
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: '4px',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '1em',
    boxShadow: '0 1px 5px rgba(0,0,0,0.2)',
    transition: 'all .25s ease-in-out',
    maxWidth: 632,
  },
  content: {
    fontSize: 'larger',
  },
  date: {
    color: 'rgb(0, 0, 0, 60%)',
  },
  attribution: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
    '& a:hover': {
      textDecoration: 'underline',
    },
    '& img': {
      marginRight: 5,
      width: 47,
      borderRadius: 5,
    },
  },
})

export const NoteCard = ({
  content,
  published,
  attributedTo,
}: Note): ReactElement => {
  const classes = useStyles()
  return (
    <div className={classes.card}>
      <div className={classes.attribution}>
        <AttributionTag to={attributedTo} />
      </div>
      <p className={classes.content}>{content}</p>
      <FormattedDate className={classes.date} value={published} />
    </div>
  )
}
