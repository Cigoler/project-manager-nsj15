import { signInWithMicrosoft } from "@/app/actions/auth"

export default function SignIn() {
  return (
    <form action={signInWithMicrosoft}>
      <button type="submit">Signin with Microsoft Entra ID</button>
    </form>
  )
} 