import { useNavigate, Form, redirect } from "react-router-dom";

import { deleteClient } from "../api/clients"

export async function action({params}) {
    await deleteClient(params.clientID)

    return redirect("/")
}

/* eslint-disable react/prop-types */
function Client({ client }) {
    const navigate = useNavigate();

    const { nombre, empresa, email, telefono, id } = client;

    return (
        <tr className="border-b">
            <td className="p-4 space-y-2">
                <p className="text-2xl text-gray-800">{nombre}</p>
                <p>{empresa}</p>
            </td>

            <td className="p-6">
                <p className="text-gray-600">
                    email:{" "}
                    <span className="text-gray-800 uppercase font-bold">
                        {email}
                    </span>
                </p>
                <p className="text-gray-600">
                    Tlf:{" "}
                    <span className="text-gray-800 uppercase font-bold">
                        {telefono}
                    </span>
                </p>
            </td>

            <td className="p-6 flex space-x-3">
                <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 uppercase font-bold"
                    onClick={() => navigate(`/clients/${id}/edit`)}
                >
                    Edit
                </button>

                <Form
                method="post"
                action={`/clients/${id}/delete`}
                onSubmit={(e) => {
                    if(!confirm("Do you really want to delete this entry?")) {
                        e.preventDefault()
                    }
                }}
                >
                    <button
                        type="submit"
                        className="text-red-600 hover:text-red-700 uppercase font-bold"
                    >
                        Delete
                    </button>
                </Form>
            </td>
        </tr>
    );
}
export default Client;
