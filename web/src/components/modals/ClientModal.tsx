import { Dialog } from "@headlessui/react";
import dayjs from "dayjs";
import { User, X } from "phosphor-react";
import { toast } from "react-toastify";
import { api } from "../../lib/axios";
import ClientForm from "../forms/ClientForm";

interface IClientModal {
  client?: Client;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  action: "create" | "edit" | "view" | "delete";
  update: () => void;
}

const ClientModal = (props: IClientModal) => {
  const { client, isOpen, setIsOpen, action, update } = props;

  const deleteClient = (client: Client) => async () => {
    await api
      .delete("/clients/" + client.id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        params: {
          id: client.id,
        },
      })
      .then(() => {
        toast("Cliente excluido com sucesso", {
          type: "success",
        });
        setIsOpen(false);
        update();
      })
      .catch((err) => {
        toast("Erro ao excluir cliente", {
          type: "error",
        });
        console.log(err);
      });
  };

  // Detectar clique fora do modal

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center rounded-md bg-slate-900 bg-opacity-70"
    >
      <Dialog.Panel>
        {action === "delete" && client && (
          <div className="flex flex-col justify-center rounded-md bg-gray-800 p-8">
            <h1 className="text-center text-xl font-bold">
              Deseja realmente excluir o cliente
              <span className="text-primary"> {client?.name}</span>?
            </h1>
            <span className="mb-2 text-gray-400">
              Esta ação não poderá ser desfeita.
            </span>
            <hr />
            <div className="mt-4 flex gap-4">
              <button
                onClick={deleteClient(client)}
                className="rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-600"
              >
                Excluir
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-500 py-2 px-4 font-bold text-white hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {action === "create" && (
          <ClientForm setIsOpen={setIsOpen} action={action} update={update} />
        )}

        {action === "edit" && client && (
          <ClientForm
            setIsOpen={setIsOpen}
            action={action}
            client={client}
            update={update}
          />
        )}

        {action === "view" && client && (
          <div className="flex flex-col">
            {/* Header */}
            <div className="flex w-full justify-between rounded-t-md bg-slate-900 p-4">
              <h1 className="text-center text-xl font-bold">
                Visualizar cliente
              </h1>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body */}
            <div className="flex flex-col items-center justify-center rounded-md bg-gray-800 p-8">
              <User size={80} />
              <h1 className="text-center text-2xl font-bold text-primary">
                {client?.name}
              </h1>
              <hr />
              <div className="mt-4 flex flex-col gap-4">
                <span className="text-gray-400">Email: {client?.email}</span>
                <span className="text-gray-400">Telefone: {client?.phone}</span>
                <span className="text-gray-400">
                  Endereço: {client?.address}
                </span>
                <span className="text-gray-400">CPF: {client?.cpf}</span>
                <hr />
                <span className="text-gray-400">
                  Cliente desde {dayjs(client?.createdAt).format("DD/MM/YYYY")}
                </span>
              </div>
            </div>
          </div>
        )}
      </Dialog.Panel>
    </Dialog>
  );
};

export default ClientModal;
