const PersonForm = (props) => {
    return (
       <form onSubmit={props.storePerson}>
         <div>
           name: <input onChange={props.handleNameInput} value={props.newName}/>
           phone number: <input onChange={props.handlePhoneNumberInput} value={props.phoneNumber} />
         </div>
         <div>
           <button type="submit">add</button>
         </div>
       </form>
    )
   }

export default PersonForm