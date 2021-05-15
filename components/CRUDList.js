import { useJournalEntries, saveEntry, getEntries, deleteEntry, editEntry } from "./CRUDProvider.js"
import JournalEntryComponent from "./CRUDComponent.js"



const eventHub = document.querySelector(".container")
//EDIT
const EntryListComponent = () => {
    let edit = false
    const content = document.querySelector(".entryLog")
    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id === "record") {
            console.log('yo')
            let company = document.querySelector(".company").value
            let hiringM = document.querySelector(".hiringM").value
            let description = document.querySelector(".description").value
            let techs = document.querySelector(".techs").value
            let applied = document.querySelector(".applied").value
            if (company === "" || hiringM === "" || description === "" || techs === "" || applied === "") {
                alert("Please fill out all Fields")
            }
            else {

                const newEntry = {
                    company: company,
                    hiringM: hiringM,
                    description: description,
                    techs: techs,
                    applied: applied
                }
                saveEntry(newEntry).then(
                    () => {
                        getEntries().then(
                            () => {
                                let recordedEntries = useJournalEntries()
                                console.log(recordedEntries)
                                content.classList.remove("emptyLog")
                                render(recordedEntries)
                            }
                        )
                    }
                )
                document.querySelector(".company").value = ""
                document.querySelector(".description").value = ""
                document.querySelector(".hiringM").value = ""
                document.querySelector(".techs").value = ""
                document.querySelector(".applied").value = ""

            }
        }

    }
    )
    eventHub.addEventListener("click", e => {

        if (e.target.id.startsWith("editNote--")) {
            let edit = true
            const [prefix, id] = e.target.id.split("--")

            const entryToBeEdited = id
            console.log(entryToBeEdited)
            const allEntries = useJournalEntries()
            const foundEntry = allEntries.filter((currentEntry) => {
                if (currentEntry.id === entryToBeEdited) {
                    let found = currentEntry.id
                    console.log(found)
                    return found
                }
            })
            let editbtn = document.querySelector(`#editNote--${id}`)
            editbtn.innerHTML = "Update"

            let comp = document.querySelector(".company").value = foundEntry[0].company
            let desc = document.querySelector(".description").value = foundEntry[0].description
            let hm = document.querySelector(".hiringM").value = foundEntry[0].hiringM
            let tech = document.querySelector(".techs").value = foundEntry[0].techs
            let applied = document.querySelector(".applied").value = foundEntry[0].applied
            let updatedEntry = {
                company: comp,
                description: desc,
                hiringM: hm,
                techs: tech,
                applied: applied
            }
            console.log(updatedEntry)

            editEntry(newEntry).then(
                () => {
                    getEntries().then(
                        () => {
                            let recordedEntries = useJournalEntries()
                            console.log(recordedEntries)
                            content.classList.remove("emptyLog")
                            render(recordedEntries)
                        }
                    )
                }
            )
            document.querySelector(".company").value = ""
            document.querySelector(".description").value = ""
            document.querySelector(".hiringM").value = ""
            document.querySelector(".techs").value = ""
            document.querySelector(".applied").value = ""


        }
    })


    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id.startsWith("deleteNote--")) {
            console.log("delete has been clicked")
            const [prefix, id] = clickEvent.target.id.split("--")
            console.log(id)
            //Invoke the function that performs the delete operation. Then invokes useNotes and renders the list
            deleteEntry(id).then(() => render(useJournalEntries()))
        }
    })


    eventHub.addEventListener("click", event => {
        if (event.target.id === "show") {
            if (document.querySelector(".entryLog").innerHTML === "") {
                document.querySelector("#show").innerHTML = "Hide Entries"
                getEntries().then(
                    () => {
                        let entries = useJournalEntries()
                        content.classList.remove("emptyLog")
                        render(entries)
                    }
                )
            }
            else {
                document.querySelector(".entryLog").innerHTML = ""
                document.querySelector("#show").innerHTML = "Show Entries"
            }
        }
    })



    const render = (entries) => {
        content.innerHTML = `
    <section class="entryList">
  ${entries.map(
            (currentEntry) => {
                return JournalEntryComponent(currentEntry)
            }
        ).join(" ")
            }
    </section>
    `
    }
}
export default EntryListComponent
