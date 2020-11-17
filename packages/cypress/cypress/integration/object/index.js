class ObjectModule {
  constructor () {
    this.defaultTime = 1000
    this.contants = {
      objectUrl: 'http://localhost:8080/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_v_l_s_g_id=20121&p_p_auth=UmUpZGeL'
    }
    this.selectors = {
      addObject: '.nav-item button.btn-primary',
      popoverContinueCheck: 'input[type="checkbox"]',
      popoverNameInput: '#customObjectNameInput'
    }
  }

  visit () {
    cy.visit(this.contants.objectUrl)
  }

  createAnObject (name, unCheck = false) {
    const { addObject, popoverContinueCheck, popoverNameInput } = this.selectors
    cy.get(addObject).click()

    cy.get('.popover.mw-100').within(() => {
      if (unCheck) {
        cy.get(popoverContinueCheck).should('be.checked').uncheck()
      }
      cy.get(popoverNameInput).type(`${name}{enter}`, {
        delay: 20
      })
    })
  }

  deleteAllObjects () {
    cy.get('tbody tr').each(() => {
      cy.wait(this.defaultTime)
      cy.get('tbody tr:nth-child(1) .dropdown-action').click()
      cy.get('.dropdown-menu.show').within(() => {
        cy.get('button').eq(5).click()
      })
    })
  }
}

module.exports = ObjectModule