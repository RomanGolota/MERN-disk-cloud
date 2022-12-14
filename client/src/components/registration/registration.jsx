import React, { useState } from "react";
import { useAddNewUserMutation } from "../../store/registration.api";
import Input from "../../utils/input/input";

const Registration = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [createUser, result] = useAddNewUserMutation()

  const registration = async () => {
    try {
      const body = {email, password}
      await createUser(body)
      alert('User created')
    } catch (e) {
      alert(e)
    }
  }

  return (
    <div className='registration'>
      <div className="registration__header">Registration</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Type email"/>
      <Input value={password} setValue={setPassword} type="password" placeholder="Type password"/>
      <button className="registration__btn" onClick={() => registration(email, password)}>Create</button>
    </div>
  );
};

export default Registration;