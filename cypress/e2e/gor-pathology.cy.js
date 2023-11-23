describe('GOR Pathology Web Portal', function()
{
    beforeEach(() =>
    {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visit('https://gor-pathology.web.app/')
        cy.wait(2000)
    })

    it('should login the page', function()
    {
        cy.get('input[name="email"]').type('test@kennect.io')
        cy.wait(2000)
        cy.get('input[name="password"]').type('Qwerty@1234')
        cy.wait(2000)
        cy.get('form').contains('form', 'Login').submit()
        cy.wait(4000)
        cy.title().should('eq','GOR Pathology Web Portal')
        cy.get('.title').should('include.text','Dashboard')
    })

    it('should see the todos list and verify it', function()
    {
        cy.get('.title').should('include.text','Remaining work')
        cy.get('li').contains('li','Active test: 154 - Automated User One')
    })

    it('should open the cost calculator, select the desired tests and apply discount', function()
    {
        cy.get('#patient-test').type('AFP').type('{downArrow}').type('{enter}')
        cy.get('[aria-haspopup="listbox"]').invoke('show').click({force:true})
        cy.get('[data-value="5"]').click({force:true})
        cy.get('div').contains('350 ₹').invoke('text').then((text)=>
        {
            const subtotal = text
            cy.log(subtotal)
            cy.get('div').contains('332.5 ₹').invoke('text').then((discountprice)=>
            {
                const total = discountprice
                cy.log(total)
                expect(total).to.not.eq(subtotal)
            })
        })
    })

    it('should add patient and detail of the patient', function()
    {
        cy.get('.MuiTypography-displayBlock').contains('Patients').trigger('mouseover').click({force:true})  // click on patient from the menu 
        cy.wait(2000)
        cy.get('span').contains('Add Patient').trigger('mouseover').click({force:true})  // click on the add patient button
        cy.wait(2000)
        cy.get('input[name="name"]').type('Fardeen Khan') // Enter the name 
        cy.get('input[name="email"]').type('fardeenkhan987@gmail.com') // enter the eamil 
        cy.get('input[name="phone"]').type('7738209841') // enter the phone number
        cy.get('.MuiButton-label').contains('General Details').trigger('mouseover').click({force:true}) // click on the general button 
        cy.wait(2000)
        cy.get('input[name="height"]').type('175.25999999999996') // enter the height 
        cy.get('input[name="weight"]').type('70') // enter the wiegth 
        cy.get('#mui-component-select-gender').invoke('show').click({force:true}) 
        cy.get('[data-value="male"]').click({force:true}) // select the gender
        cy.wait(2000)
        cy.get('input[name="age"]').type('27') // enter the age 
        cy.get('.MuiButton-label').contains('Add Tests').trigger('mouseover').click({force:true}) // click on the add test button
        cy.wait(2000)
        cy.get('#patient-test').type('AFP').type('{downArrow}').type('{enter}') // add test
        cy.get('[aria-haspopup="listbox"]').contains('None').invoke('show').click({force:true}) // discount
        cy.get('[data-value="5"]').click({force:true}) //discount
        cy.wait(2000)
        cy.get('[aria-hidden="true"]').contains('add_box').trigger('mouseover').click({force:true}) // click on the add button for equitment 
        cy.wait(2000)
        cy.get('[aria-label="Eqipment Name"]').invoke('show').click({force:true}) // select the equipements
        cy.get('[data-value="4KbXQA2Xbj0wQRHx2UD4"]').click({force:true})
        cy.get('.material-icons').contains('check').trigger('mouseover').click({force:true}) /// click on the check button for eqiupement 
        cy.wait(2000)
        cy.get('#patient-tests-labs').type('Hea').type('{downArrow}').type('{enter}') /// Select Lab
        cy.wait(2000)
        cy.get('input[name="doctor_name"]').type('beans').type('{downArrow}').type('{enter}') /// doctor name
        cy.wait(2000)
        cy.get('#mui-component-select-doctor_commission').invoke('show').click({force:true}) //doctor's commission
        cy.get('[data-value="10"]').click({force:true}) // doctor's commission
        cy.get('.MuiButton-label').contains('Add Patient').trigger('mouseover').click({force:true})
        cy.wait(5000)

        cy.get('[value="Fardeen Khan"]').should('have.text', 'Fardeen Khan') // Assertion for added patient
    })
})