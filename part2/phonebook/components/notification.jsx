const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    else {
      return (
        <div className='addition-notification'>
          {message}
        </div>
      )
    }
  }

export default Notification