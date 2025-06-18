<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="card-columns">
        <button
          type="button"
          :disabled="loading"
          @click="getScholarshipForm"
          class="btn btn-info btn-block"
        >
          Scholarship
        </button>

        <button
          type="button"
          :disabled="loading"
          @click="getReAdmissionForm"
          class="btn btn-info btn-block"
        >
          Re-admission
        </button>
        <nuxt-link to="/bank-slip" class="btn btn-info btn-block text-center"
          >Bank Slip</nuxt-link
        >

        <nuxt-link to="/admit-card" class="btn btn-info btn-block text-center"
          >Admit Card</nuxt-link
        >

        <nuxt-link
          to="/permission-for-exam"
          class="btn btn-info btn-block text-center"
          >Permission For Exam</nuxt-link
        >

        <nuxt-link
          to="/mid-term-retake"
          class="btn btn-info btn-block text-center"
          >Mid Term Retake</nuxt-link
        >

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getProvisionalCertificate"
        >
          Provisional Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getTranscriptMarkCertificate"
        >
          Transcript / Mark Certificate
        </button>

        <nuxt-link to="/convocation" class="btn btn-info btn-block text-center"
          >Convocation</nuxt-link
        >

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Appeared Certificate')"
        >
          Appeared Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Testimonial')"
        >
          Testimonial
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Character Certificate')"
        >
          Character Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Course Completion Certificate')"
        >
          Course Completion Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Medium of Instruction Certificate')"
        >
          Medium of Instruction Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Transcript of Academic Record')"
        >
          Transcript of Academic Record
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Recommendation Letter')"
        >
          Recommendation Letter
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('English Proficiency Certificate')"
        >
          English Proficiency Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Studentship Certificate')"
        >
          Studentship Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getApplicationForm('Migration Certificate')"
        >
          Migration Certificate
        </button>

        <button
          type="button"
          :disabled="loading"
          class="btn btn-info btn-block"
          @click="getProfessionalShortCourse"
        >
          Professional Short Course
        </button>

      

        <nuxt-link
          to="/research-internship-project-thesis"
          class="btn btn-info btn-block text-center"
          >Research /Internship / Project / Thesis</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import download from "downloadjs";
import { mapActions } from "vuex";

export default {
  name: "index",
  data() {
    return {
      loading:false
    };
  },
  methods: {
    // Scholarship Form
    async getScholarshipForm() {
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      if (!user) {
        this.$toast.info("Please login as a student", {
          icon: "error_outline"
        });
        return false;
      } else {
        return await this.$axios
          .get("/student/scholarship-form?token=" + token, {
            /*params: {
            student_id: user.id,
          },*/
            responseType: "blob"
          })
          .then(response => {
            const content = response.headers["content-type"];
            download(response.data, "scholarship_form", content);

            this.$toast.success("Scholarship Form Download Successfully", {
              icon: "error_outline"
            });
          })
          .catch(error => {
            var errors = error.response;
            console.log(errors);
          }).finally(()=>{
            this.loading=false
          });
      }
    },

    // re-admission-form
    async getReAdmissionForm() {
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      if (!user) {
        this.$toast.info("Please login as a student", {
          icon: "error_outline"
        });
        return false;
      } else {
        return await this.$axios
          .get("/student/re-admission-form?token=" + token, {
            /*params: {
            student_id: user.id,
          },*/
            responseType: "blob"
          })
          .then(response => {
            const content = response.headers["content-type"];
            download(response.data, "re_admission", content);

            this.$toast.success("Re Admission Form Download Successfully", {
              icon: "error_outline"
            });
          })
          .catch(error => {
            var errors = error.response;
            console.log(errors);
          }).finally(()=>{
            this.loading=false
          });
      }
    },

    // Provisional Certificate
    async getProvisionalCertificate() {
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/student/provisional-certificate-form?token=" + token, {
          /*params: {
          student_id: user.id,
        },*/
          responseType: "blob"
        })
        .then(response => {
          const content = response.headers["content-type"];
          download(response.data, "provisional_certificate", content);

          this.$toast.success(
            "Provisional Certificate Form Download Successfully",
            { icon: "error_outline" }
          );
        })
        .catch(error => {
          var errors = error.response;
          console.log(errors);
        }).finally(()=>{
            this.loading=false
          });
    },

    // Transcript Mark Certificate
    async getTranscriptMarkCertificate() {
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/student/transcript-mark-certificate-form?token=" + token, {
          /*params: {
          student_id: user.id,
        },*/
          responseType: "blob"
        })
        .then(response => {
          const content = response.headers["content-type"];
          download(response.data, "transcript_mark_certificate", content);

          this.$toast.success(
            "Transcript / Mark Certificate Form Download Successfully",
            { icon: "error_outline" }
          );
        })
        .catch(error => {
          var errors = error.response;
          console.log(errors);
        }).finally(()=>{
            this.loading=false
          });
    },

    // getApplicationForm
    async getApplicationForm(name) {
      var vm = this;

      var certificate_name = name;
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/student/application-form?token=" + token, {
          params: {
            certificate_type: certificate_name
          },
          responseType: "blob"
        })
        .then(response => {
          const content = response.headers["content-type"];
          download(response.data, certificate_name, content);

          this.$toast.success(
            certificate_name + " Form Download Successfully",
            { icon: "error_outline" }
          );
        })
        .catch(error => {
          var errors = error.response;
          console.log(errors);
        }).finally(()=>{
            this.loading=false
          });
    },

    // ProfessionalShortCourse
    async getProfessionalShortCourse() {
      this.loading=true
      var token = window.$nuxt.$cookies.get("token");
      var user = window.$nuxt.$cookies.get("user");

      return await this.$axios
        .get("/student/professional-short-course-form?token=" + token, {
          responseType: "blob"
        })
        .then(response => {
          const content = response.headers["content-type"];
          download(response.data, "professional_short_course", content);

          this.$toast.success(
            "Professional Short Course Form Download Successfully",
            { icon: "error_outline" }
          );
        })
        .catch(error => {
          var errors = error.response;
          console.log(errors);
        }).finally(()=>{
            this.loading=false
          });
    }
  }
};
</script>

<style scoped></style>
