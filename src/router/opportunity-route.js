import List from "@/pages/Opportunity/List/OpportunityList.vue";
import Create from "@/pages/Opportunity/Create/OpportunityCreate.vue"

console.log(2);
const opportunityRoute =[
    {
        path: '/list',
        name: 'opportunity-list',
        component: List,
    },
    {
        path: '/opportunity/create',
        name: 'opportunity-create',
        component: Create,
    },
]
export default opportunityRoute