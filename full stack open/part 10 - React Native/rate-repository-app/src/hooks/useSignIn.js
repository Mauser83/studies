import { AUTHENTICATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

const useSignIn = () => {
    const [mutate, result] = useMutation(AUTHENTICATE_USER);

    const signIn = async ({ username, password }) => {

        try {
            const { data } = await mutate({
                variables: {
                    credentials: {
                        username,
                        password,
                    },
                },
            });
            return data.authenticate.accessToken;
        } catch (err) {
            throw new Error(err);
        }
    }

    return [signIn, result];
}

export default useSignIn;