import { FC } from "react"
import { Layout } from "../../components/templates/Layout"
import { Container } from "../../components/atoms/Container"
import { LoginForm } from "../../components/organisms/LoginForm"

const Login: FC = () => {
    return (
        <Layout>
            <Container className="text-lg font-medium">
                Login
            </Container>

            <LoginForm />
        </Layout>
    )
}

export { Login }
  