import { useLoaderData } from "react-router-dom";
import {getClients} from "../api/clients"

//Components
import Client from "../components/Client";

export function loader() {
    const clients = getClients()
    return clients;
}

function Index() {
    const clients = useLoaderData();

    return (
        <>
            <h1 className="font-bold text-blue-900 text-4xl">Clients</h1>
            <p className="mt-3">Clients Admin</p>

            {clients?.length > 0 ? (
                <table className="w-full bg-gray-50 mt-5 table-auto">
                    <thead className="bg-blue-800 text-gray-100">
                        <tr>
                            <th className="p-2">Client</th>
                            <th className="p-2">Contact</th>
                            <th className="p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <Client 
                            key={client.id}
                            client={client}
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center mt-10">No clients yet</p>
            )}
        </>
    );
}
export default Index;
