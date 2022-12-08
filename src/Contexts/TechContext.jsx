import { useEffect } from "react";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../Services/api";

export const TechContext = createContext({});

export const TechProvider = ({children}) => {

    const [ listTechs, isListTechs ] = useState([])
    const [ modalAdd, setModalAdd ] = useState(false)
    const [ modalEdit, setModalEdit ] = useState(false)

     async function techCreate (formData) {
          
        try {
            await Api.post("/users/techs", formData)
            
            toast.success("Tecnologia criada com sucesso!")
           
        
        } catch (error) {
            toast.error("A tecnologia já existe!")
            console.log(error)
        }
    }

    async function techDelete (techID) {
        try {
            await Api.delete(`/users/techs/${techID}`)

            toast.success("Tecnologia deletada com sucesso")
            
        } catch (error) {
            console.log(error)
        }
    }

    async function techEdit (techID, data){
        
        try {
            await Api.put(`/users/techs/${techID}`, data)
            
            toast.success("Tecnologia editada com sucesso!")
            
        } catch (error) {
            console.log(error)
            toast.error("A tecnologia não pode ser editada")
        }
    }

    useEffect(() => {

        async function getTech () {
            const idUser = localStorage.getItem("@USERID:")
            
            try {
                    const response =  await Api.get(`/users/${idUser}`)
                    const tecnologias = response.data.techs
                    
                    isListTechs(tecnologias)
                
            } catch (error) {
                console.log(error)
            }
        }

        getTech()

    }, [listTechs])


    return (
        <TechContext.Provider value={{ techCreate, listTechs, 
        isListTechs, techDelete, 
        techEdit, modalAdd, modalEdit, 
        setModalAdd, setModalEdit }}>
            {children}
        </TechContext.Provider>
    )
}