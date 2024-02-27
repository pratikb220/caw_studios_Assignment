
describe('Upload and verify JSON data into table',() => {
    it('Upload_Verify', () => {

        //visiting the target URL
        cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html")

        //click on "Table Data" button
        cy.get("div[class='centered'] details summary").click()

        //creating const for expected JSON data to be given as input
        const jsonData =[{"name":"Bob","age":20,"gender":"male"},{"name":"George","age":42,"gender":"male"},{"name":"Sara","age":42,"gender":"female"},{"name":"Conor","age":40,"gender":"male"},{"name":"Jennifer","age":42,"gender":"female"}]
        
        //putting JSON data into the text field
        cy.get("#jsondata").invoke('val', JSON.stringify(jsonData))

        //Click on "Refresh Table" button
        cy.get("#refreshtable").click()

        //wait for 2 sec for table to be reloaded
        cy.wait(2000)

        //get all the rows of the table updated
        cy.get('#dynamictable').find('tr').then((rows) => {
            // array to store the JSON objects
            const updated_jsonData = []
      
            // Iterate over each row expect the header row
            for (let i = 1; i < rows.length; i++) {
              // Get the columns in the current row
              const columns = Cypress.$(rows[i]).find('td')
      
              // Get the data from columns
              const name = columns.eq(0).text()
              const age = parseInt(columns.eq(1).text())// Assuming age is a number
              const gender = columns.eq(2).text()
      
              // Creating the JSON Object
              const jsonObject = { name, age, gender }
      
              // Push the object to the array
              updated_jsonData.push(jsonObject)
            }
      
            // Log the updated JSON format
            cy.log(JSON.stringify(updated_jsonData))

            //verify if the populated data in the table matches with given jsonData
            cy.wrap(updated_jsonData).should('deep.equal', jsonData)
        })

    })

})