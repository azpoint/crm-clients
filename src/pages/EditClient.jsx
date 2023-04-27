import { Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom";
import { getClient, updateClient } from "../api/clients";

import ClientForm from "../components/ClientForm";

import Error from "../components/Error";


export async function loader({ params }) {

    const client = await getClient(params.clientID);

    if (Object.values(client).length === 0) {
        throw new Response("", {
            status: 404,
            statusText: "Client does no exist",
        });
    }

    return client;
}

export async function action({request, params}) {
  const formData = await request.formData();

    const data = Object.fromEntries(formData);

    const email = formData.get("email")

    //Validation
    const errors = [];
    if (Object.values(data).includes("")) {
        errors.push("All fields are required");
    }

    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if(!regex.test(email)) {
      errors.push("email not valid")
    }

    if(Object.keys(errors).length) {
      return errors
    }

    //Update Client

    await updateClient(params.clientID, data)

    return redirect("/");
}



function EditClient() {
    const navigate = useNavigate()
    const client = useLoaderData()
    const errors = useActionData()

    return (
        <>
            <h1 className="font-bold text-blue-900 text-4xl">Edit Client</h1>
            <p className="mt-3">Fix what you need</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-gray-100 px-3 py-1 font-semibold uppercase"
                    onClick={() => navigate("/")}
                >
                    go back
                </button>
            </div>

            <Form method="post" noValidate>
                <div className="bg-gray-100 rounded-md shadow md:w-3/4 mx-auto px-5 py-10 mt-10">
                    <ClientForm client={client}/>
                    {errors?.length &&
                        errors.map((err, index) => (
                            <Error key={index}>{err}</Error>
                        ))}
                    <input
                        type="submit"
                        className="mt-5 w-full bg-blue-800 p-3 uppercase font-semibold text-gray-50 text-lg"
                        value="Add Client"
                    />
                </div>
            </Form>
        </>
    );
}
export default EditClient;
