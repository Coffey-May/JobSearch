import EntryListComponent from "./components/CRUDList.js"
import { JournalFormComponent } from "./components/CRUDForm.js"
import { getEntries } from "./components/CRUDProvider.js";


// import { journalEdit } from "./JournalEdit.js";

JournalFormComponent()
getEntries()
    .then(() =>
        EntryListComponent())