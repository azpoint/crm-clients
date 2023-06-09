/* eslint-disable no-control-regex */
import { useNavigate, Form, useActionData, redirect } from "react-router-dom";
import { addClient } from "../api/clients";

//Components
import ClientForm from "../components/ClientForm";
import Error from "../components/Error";

export async function action({ request }) {
    const formData = await request.formData();

    const data = Object.fromEntries(formData);

    //Get value in fields form with router-dom
    // console.log(formData.get("nombre"))
    // console.log([...formData])
    // const formDatas = Object.fromEntries(formData)
    // console.log(formDatas)


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

    //Add client

    await addClient(data)

    return redirect("/");
}

function NewClient() {
    const navigate = useNavigate();

    const errors = useActionData()


    return (
        <>
            <h1 className="font-bold text-blue-900 text-4xl">New Client</h1>
            <p className="mt-3">All fields must be completed</p>

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
                    <ClientForm />
                    {errors?.length && errors.map((err, index) => (
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
export default NewClient;

// navigate(-1) goes to the previous page
