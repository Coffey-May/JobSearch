const eventHub = document.querySelector(".formDiv")

export const JournalFormComponent = () => {
    const journalPage = document.querySelector(".formDiv")

    journalPage.innerHTML = `
    <header>
    <h2>Job Hunt Tracker</h2>
</header>
    <div class="form">
        
    <article>
        <form action="">

        <h2>Create new job entry</h2>
           <label for="Company">Company</label><br>
            <input class="company" type="text"><br>
            <label for="description">Description</label><br>
            <input  class="description" type="text"><br>
            <label for="hiring manager">Hiring Manager</label><br>
            <input  class="hiringM" type="text"><br>
            <label for="tech stack">Tech Stacks</label><br>
            <input  class="techs" type="text"><br>
            <label for="applied">Applied</label><br>
            <input  class="applied" type="text">
        </form><hr>
        <button  id="record">Record Job Entry</button><hr>
        <button id="show">Show Entries</button>
    </article>
  
    <article>
        <table >
            <tr>
                <th>Company</th>
                <th>Description</th>
                <th>Hiring manager</th>
                <th>Tech Stacks</th>
                <th>Applied</th>
                <th>EDIT OR DELETE</th>
            </tr>
         
    </article>
  
</div>


</table>
<div class="entryLog"></div>`
}


// eventHub.addEventListener("click", event => {
//     if (event.target === document.getElementById('recordEntries')) {

//     }
// }
// )

{/* <tr>
    <td>40AU</td>
    <td>Consultancy</td>
    <td>Work Varies</td>
    <td>?</td>
    <td>?</td>
    <td>?</td>
   
    <td class="btns">
        <button class="btn-danger">Delete</button>
        <button class="btn-warning">Edit</button>
    </td>
</tr> */}