import { FC } from "react"
import { Layout } from "../../components/templates/Layout"
import { Container } from "../../components/atoms/Container"
import { SignInForm } from "../../components/organisms/SignInForm"

const SignIn: FC = () => {
    return (
        <Layout>
            <Container className="text-lg font-medium">
                Sign In
            </Container>

            <SignInForm />
        </Layout>
    )
}

export { SignIn }
  