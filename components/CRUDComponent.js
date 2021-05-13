/*
 *  Purpose: To render a single journal entry as an
 *           HTML representation of the data
 */
const JournalEntryComponent = (entry) => {
  return `
    <section class="entry__card">
    <table>
    <tr id="table-row">
    <th id="company"> ${entry.company}</th>
    <th id="description"> ${entry.description}</th>
    <th id="hiringManager"> ${entry.hiringManager}</th>
    <th id="techs"> ${entry.techs}</th>
    <th id="applied"> ${entry.applied}</th>
    <input type="hidden" class="hiddenId" id="entry-id"/>
  <th class="btnFlex">
  
  <div class="btn-group" role="group" >
    <button class="deleteButton" id="deleteNote--${entry.id}">Delete</button>
    <button type="submit" class="editButton"  id="editNote--${entry.id}">Edit</button>
    </div>
</th>
</tr>
</table>

</section>

   `
}

export default JournalEntryComponent

