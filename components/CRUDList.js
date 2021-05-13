import { useJournalEntries, saveEntry, getEntries, deleteEntry } from "./CRUDProvider.js"
import JournalEntryComponent from "./CRUDComponent.js"



const eventHub = document.querySelector(".container")

const EntryListComponent = () => {
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
            }
            )
            let editbtn = document.querySelector(`#editNote--${id}`)
            editbtn.innerHTML = "Update"
            console.log(foundEntry[0].company)


            document.querySelector(".company").value = foundEntry[0].company
            document.querySelector(".description").value = foundEntry[0].description
            document.querySelector(".hiringM").value = foundEntry[0].hiringM
            document.querySelector(".techs").value = foundEntry[0].techs
            document.querySelector(".applied").value = foundEntry[0].applied

            // let company = document.getElementById("#company").value
            // console.log(company)
            // let desc = document.querySelector(".desc").value
            // let hm = document.querySelector(".hm").value
            // let tech = document.querySelector(".tech").value
            // let appl = document.querySelector(".appl").value

            // let company = document.querySelector(`#${e.target.company}`)

            // const [prefix, id] = e.target.id.split("--")
            // console.log(prefix, id)
            // document.querySelector(".company").value = "s"
            // document.querySelector(".description").value = "s"
            // document.querySelector(".hiringM").value = "s"
            // document.querySelector(".techs").value = "s"
            // document.querySelector(".applied").value = "s"



            // const editEvent = new CustomEvent("editButtonClicked", {
            //     detail: {
            //         noteId: id
            //     }
            // })
            // eventHub.dispatchEvent(editEvent)

        }
    })
    // eventHub.addEventListener("entryEdited", event => {
    //     const updatedEntries = useJournalEntries()
    //     content.classList.remove("emptyLog")
    //     render(updatedEntries)
    // })

    // eventHub.addEventListener("click", theEvent => {
    //     if (theEvent.target.id.startsWith("editNote--")) {
    //         const dialogSiblingSelector = `#${theEvent.target.id}+dialog`
    //         const theDialog = document.querySelector(dialogSiblingSelector)
    //         theDialog.showModal()
    //     } else if (theEvent.target.classList.contains("button--close")) {
    //         const dialogElement = theEvent.target.parentNode
    //         dialogElement.close()
    //     }
    // })

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
