import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useJobStore = defineStore("jobs", () => {
  const allJobs = ref<Array<object>>([]);
  const loginToken = process.client ? localStorage.getItem("loginToken") : null;
  const userEmail = process.client ? localStorage.getItem("userEmail") : null;
  const userAppliedJobs = ref<Array<object>>([]);
  const savedJobsArray: object[] = [];

  const getAllJobs = async () => {
    try {
      const response = await axios.get("jobs");
      allJobs.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getUserAppliedJobs = async () => {
    try {
      const response = await axios.get("applications/status", {
        params: {
          userEmail,
        },
        headers: {
          Authorization: `Bearer ${loginToken}`,
        },
      });
      console.log(response.data);
      userAppliedJobs.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const handleJobSave = (job: object) => {
    try {
      const jobId = job.id;
      if (savedJobsArray.some((savedJob) => savedJob?.id === jobId)) {
        useNuxtApp().$toast.info("Job already saved! 👍");
      } else {
        savedJobsArray.push(job);
        if (process.client) {
          localStorage.setItem("savedJobs", JSON.stringify(savedJobsArray));
        }
        useNuxtApp().$toast.success("Job saved successfully! 🙌");
      }
    } catch (error) {
      useNuxtApp().$toast.error("Failed to save the job 😓");
    }
  };

  return {
    getAllJobs,
    savedJobsArray,
    handleJobSave,
    allJobs,
    getUserAppliedJobs,
    userAppliedJobs,
  };
});
