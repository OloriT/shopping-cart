import { LoginAndSignup } from "./pages/constants.cy"

const loginPage = new LoginAndSignup()

describe('Place and Confirm Order', function () {


    it('Launch Website', () => {

        //1. The user visits the address
        loginPage.baseUrl()


    });

    it('Sign In', () => {

        //2. click on signin/login button
        loginPage.signLoginButton()

        //enter credentials
        //enter username
        loginPage.enterUsername(loginPage.userName)

        //enter password
        loginPage.enterPassword(loginPage.passWord)

        //click on the login button to login
        loginPage.loginButton()

    });


    it('Get Label and Associated Price', () => {
        //3. On landing page, under FEATURED ITEMS we see a list of apparels.
        //Get the label and associated price of those item.

        const labels = '.product-image-wrapper > .single-products > .productinfo > p'
        cy.get(labels).should('be.visible')

        const prices = '.product-image-wrapper > .single-products > .productinfo > h2'
        cy.get(prices).should('be.visible')


        //Fetch them and sort it as per their price [Low to High] and print it on Console [Label & Price]
        cy.get('.features_items').each(($el) => {
            $el.find(labels).text();
            $el.find(prices).text();

            cy.log(`Label: ${labels}, Price: ${prices}`);
        });


    });

    it('Select Item and Add to Cart', () => {
        //4a. click on dress under Women
        cy.get(':nth-child(1) > .panel-heading > .panel-title').click({ force: true })
        cy.wait(3000)

        //b. click on Women Top products
        cy.get('#Women > .panel-body > ul > :nth-child(2)').click({ force: true })
        cy.wait(3000)

        //c. Select the fancy green top and add to cart
        cy.get(':nth-child(10) > .product-image-wrapper > .single-products > .productinfo > .btn').click({ force: true })
        cy.wait(3000)

        //Confirm the 1st product has been added to cart({ force: true })
        loginPage.confirmCart()

        //click on continue shopping to add product 2
        loginPage.continueButton()
        cy.wait(3000)

        //d. Select Summer White Top and add to cart as well.
        cy.get(':nth-child(8) > .product-image-wrapper > .single-products > .productinfo > .btn').click({ force: true })
        cy.wait(3000)

        //Confirm the 1st product has been added to cart({ force: true })
        loginPage.confirmCart()

        //click on continue shopping to add product 2
        loginPage.continueButton()
        cy.wait(3000)


    });

    it('View Cart', () => {

        //5.a Click View Cart button in the pop-up to proceed to checkout
        cy.get('u').click({ force: true })

        //confirm that click on View Cart redirects the user to the cart page
        cy.url().should('eq', 'https://www.automationexercise.com/view_cart')

        //5b. Proceed to checkout
        cy.get('.col-sm-6 > .btn').click({ force: true })

        //confirm user is directed to checkout page
        cy.url().should('eq', 'https://www.automationexercise.com/checkout')

        //5c. Add the comment ”Order placed.”
        cy.get('.form-control').type('Order placed')

        //5d. click on place order
        cy.get(':nth-child(7) > .btn').click({ force: true })

        //5e. enter card details
        //enter card name
        loginPage.enterCardName(loginPage.cardName)

        //enter card number
        loginPage.enterCardNo(loginPage.cardNumber)

        //enter card cvv
        loginPage.enterCvv(loginPage.cvvNo)

        //enter expiration month
        cy.get('[data-qa="expiry-month"]').type('01')

        //enter expiration year
        cy.get('[data-qa="expiry-year"]').type('1990')

        //5f.click on pay and confirm order
        cy.get('[data-qa="pay-button"]').click({ force: true })


    });

    it('Confirm Placed Order', () => {

        //6.a Confirm Order has been placed
        // cy.get('.col-sm-9 > p').should('Congratulations! Your order has been confirmed!')
        cy.contains('Congratulations! Your order has been confirmed!')

        cy.get('.col-sm-9 > p').each(($el) => {
            // Extract the text content of the element
            const text = $el.text();

            // Print the text content to the console
            console.log(text);
        });



    });

})