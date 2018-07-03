export default {
  wrapper: {
    position: 'relative',
    display: 'inline-block',
    zIndex: '98',
    color: '#555',
    cursor: 'help',
  },
  tooltip: {
    position: 'absolute',
    zIndex: '99',
    background: '#000',
    bottom: '100%',
    left: '50%',
    marginBottom: '10px',
    padding: '5px',
    WebkitTransform: 'translateX(0%)',
    msTransform: 'translateX(0%)',
    OTransform: 'translateX(0%)',
    transform: 'translateX(0%)',
  },
  content: {
    background: '#000',
    color: '#fff',
    fontSize: '.8em',
    padding: '.3em 1em',
    whiteSpace: 'wrap',
  },
  arrow: {
    position: 'absolute',
    width: '0',
    height: '0',
    bottom: '-5px',
    left: '5%',
    marginLeft: '-5px',
    borderLeft: 'solid transparent 5px',
    borderRight: 'solid transparent 5px',
    borderTop: 'solid #000 5px',
  },
  gap: {
    position: 'absolute',
    width: '100%',
    height: '20px',
    bottom: '-20px',
  },
}
