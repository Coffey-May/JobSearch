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
  ${
            entries.map(
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
