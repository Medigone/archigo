frappe.listview_settings['Proposition Bis'] = {
    get_indicator(doc) {
        // customize indicator color
        if (doc.workflow_state == "Nouveau") {
            return [__("Nouveau"), "blue", "workflow_state,=,Nouveau"];
        } else if (doc.workflow_state == "En Cours") {
            return [__("En Cours"), "orange", "workflow_state,=,En Cours"];
        } else if (doc.workflow_state == "Envoyée") {
            return [__("Envoyée"), "yellow", "workflow_state,=,Envoyée"];   
        } else if (doc.workflow_state == "Gagnée") {
            return [__("Gagnée"), "green", "workflow_state,=,Gagnée"];
        } else {
            return [__("Perdue"), "red", "workflow_state,=,Perdue"];
        }
    },

    
}