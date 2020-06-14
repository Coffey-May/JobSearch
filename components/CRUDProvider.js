let journal = []

export const getEntries = () => {
    //requests the data from an API from the internet
    return fetch("http://localhost:3000/entries")
        //When we get a response with a string, parse the string. YOU CAN ONLY SEND STRINGS OVER THE INTERNET
        .then(response => response.json())
        //Then do something with the data
        .then(
            parsedEntries => {
                console.log(parsedEntries)
                journal = parsedEntries.slice()
            }
        )
}

/*
  You export a function that provides a version of the
  raw data in the format that you want
*/
export const useJournalEntries = () => {
    const sortedByDate = journal.sort(
        (currentEntry, nextEntry) =>
            Date.parse(currentEntry.date) - Date.parse(nextEntry.date)
    )
    return sortedByDate
}


export const saveEntry = entry => {
    return fetch("http://localhost:3000/entries", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    })
        .then(getEntries)
}

export const deleteEntry = entryId => {
    return fetch(`http://localhost:3000/entries/${entryId}`, {
        method: "DELETE"
    })
        .then(getEntries)
}

export const editEntry = (entryObject) => {
    return fetch(`http://localhost:3000/entries/${entryObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(entryObject)
    })
        .then(getEntries)
}