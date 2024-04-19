import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";
export const useJobStore = defineStore('jobs' , () => {

    const allJobs = ref<Array<object>>([])
    const getAllJobs = async () => {
        try {            
            const response = await axios.get('jobs')
            allJobs.value = response.data.data
            console.log(allJobs.value)
        } catch (error) {
            console.log(error)
        }
        
    }
    return {
        getAllJobs,allJobs
    }
}) 