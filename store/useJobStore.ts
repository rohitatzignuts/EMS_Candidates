import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useJobStore = defineStore("jobs", () => {
  const trendingJobs = ref<Array<object>>([]);
  const allJobs = ref<Array<object>>([]);
  const loginToken = process.client ? localStorage.getItem("loginToken") : null;
  const userEmail = process.client ? localStorage.getItem("userEmail") : null;
  const userAppliedJobs = ref<Array<object>>([]);
  const savedJobsArray = ref<Array<object>>([]);
  const savedJobsData = process.client
    ? localStorage.getItem("savedJobs")
    : null;
  const savedJobs = ref(savedJobsData ? JSON.parse(savedJobsData) : []);

  const getTrendingJobs = async () => {
    try {
      const response = await axios.get("jobs", {
        params: {
          trending: "trending",
        },
      });
      trendingJobs.value = response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

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
      if (savedJobsArray.value.some((savedJob) => savedJob?.id === jobId)) {
        useNuxtApp().$toast.info("Job already saved! 👍");
      } else {
        savedJobsArray.value.push(job);
        if (process.client) {
          localStorage.setItem(
            "savedJobs",
            JSON.stringify(savedJobsArray.value)
          );
        }
        useNuxtApp().$toast.success("Job saved successfully! 🙌");
      }
    } catch (error) {
      useNuxtApp().$toast.error("Failed to save the job 😓");
    }
  };

  const handleJobRemove = (id: number) => {
    try {
      const index = savedJobs.value.findIndex((job) => job.id === id);
      if (index !== -1) {
        savedJobs.value.splice(index, 1);
        localStorage.setItem("savedJobs", JSON.stringify(savedJobs.value));
        // Trigger reactivity here by assigning a new value to savedJobs.value
        savedJobs.value = [...savedJobs.value];
      }
    } catch (error) {
      useNuxtApp().$toast.error("Failed to remove the job 😓");
    }
  };

  return {
    getTrendingJobs,
    savedJobsArray,
    getAllJobs,
    handleJobSave,
    trendingJobs,
    allJobs,
    getUserAppliedJobs,
    handleJobRemove,
    savedJobs,
    userAppliedJobs,
  };
});
