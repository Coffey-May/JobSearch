import { useJournalEntries, editEntry } from "./CRUDProvider.js"

const eventHub = document.querySelector(".formDiv")


export const journalEdit = () => {
    console.log("hi")
    eventHub.addEventListener("editButtonClicked", event => {
        console.log("ojojojo")
        const entryToBeEdited = event.detail.noteId
        const allEntries = useJournalEntries()
        const foundEntry = allEntries.find(
            (currentEntry) => {
                return currentEntry.id === parseInt(entryToBeEdited, 10)
            }
        )
        document.querySelector("#entry-id").value = foundEntry.id
        document.querySelector(`#editConcept--${entryToBeEdited}`).value = foundEntry.concept
        document.querySelector(`#editEntry--${entryToBeEdited}`).value = foundEntry.entry
        document.querySelector(`#editMood--${entryToBeEdited}`).value = foundEntry.mood
        document.querySelector(`#editDate--${entryToBeEdited}`).value = foundEntry.date

    })


    eventHub.addEventListener("click", clickEvent => {
        if (clickEvent.target.id.startsWith("saveEdit")) {
            const [prefix, id] = clickEvent.target.id.split("--")
            const editedEntry = {
                id: parseInt(document.querySelector("#entry-id").value, 10),
                concept: document.querySelector(`#editConcept--${id}`).value,
                entry: document.querySelector(`#editEntry--${id}`).value,
                mood: document.querySelector(`#editMood--${id}`).value,
                date: document.querySelector(`#editDate--${id}`).value
            }
            editEntry(editedEntry)
                .then(() => {
                    eventHub.dispatchEvent(new CustomEvent("entryEdited"))
                })
        }
    })
}