const Notification = ({ message, successfulMessage }) => {
    if (message === null) {
      return null
    }
    else if (successfulMessage === true) {
      return (
        <div className='success-notification'>
          {message}
        </div>
      )
    }
    else if (successfulMessage === false) {
      return (
        <div className='fail-notification'>
          {message}
        </div>
      )
    }
  }

export default Notification