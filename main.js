import EntryListComponent from "./components/CRUDList.js"
import { JournalFormComponent } from "./components/CRUDForm.js"
import { getEntries } from "./components/CRUDProvider.js";
import { journalEdit } from "./components/CRUDEdit.js"
// import { CrudEdit2 } from "./components/CrudEdit2.js"



JournalFormComponent()
getEntries().then(() => EntryListComponent())

journalEdit()
