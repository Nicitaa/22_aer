import React, { useState } from "react"
import { Input } from "../ui"
import AuthForm from "./AuthForm"

function RecoverAccountForm() {
  const [email, setEmail] = useState("")
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const inputs = [
    <Input
      type="text"
      id="email"
      placeholder="Email"
      value={email}
      label="Email"
      labelHidden={true}
      handleChange={handleEmailChange}
    />,
    <button type="submit" className="p-4 w-full bg-cta rounded-lg text-md">
      Send Email
    </button>
  ]
  return <AuthForm inputs={inputs} onSubmit={() => {}} />
}

export default RecoverAccountForm
