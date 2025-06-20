<template>
  <div class="">
    <div class="row">
      <div class="col-lg-8 col-md-8 col-sm-12 ">
        <div class="row g-3 mb-3">


          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: #2563eb;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
              </div>
              <div>
                <h5 class="mb-0 fw-bold text-dark pt-1">$4,200.00</h5>
                <small class="text-muted fw-bold">Total Payable</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: orange;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
              </div>
              <div>
                <h5 class="mb-0 fw-bold text-dark pt-1">$4,200.00</h5>
                <small class="text-muted fw-bold">Total Paid</small>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-4 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded d-flex justify-content-start align-items-center"
              style="height:100px;">
              <div class="rounded-circle d-flex justify-content-center align-items-center me-3"
                style="width: 48px; height: 48px; background-color: #000;">
                <i class="fa fa-file-text text-white" style="font-size: 20px;"></i>
              </div>
              <div>
                <h5 class="mb-0 fw-bold text-dark pt-1">$4,200.00</h5>
                <small class="text-muted fw-bold">Total Due</small>
              </div>
            </div>
          </div>

          <div class=" col-12 bg-white shadow-sm p-3 rounded">
            <div class="">
              <h4 class="fw-semibold">Semester’s Grade</h4>
              <hr>

              <div class="vertical ">
                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill">
                      <span>100%</span>
                    </div>
                  </div>
                </div>

                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill">
                      <span>75%</span>
                    </div>
                  </div>
                </div>

                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill">
                      <span>60%</span>
                    </div>

                  </div>
                   <div class="serial">#1</div>
                </div>



                <div class="progress-bar">
                  <div class="progress-track">
                    <div class="progress-fill">
                      <span>34%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded">
              <h4 class="fw-semibold">Summary</h4>
              <hr>
              <table class="table table-borderless table-sm mb-0">
                <tbody>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-star me-2 text-muted"></i>GPA</td>
                    <td class="text-start fw-bold">: &nbsp; &nbsp; 3.36</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Avarage Grade</td>
                    <td class="text-start fw-bold">: &nbsp; &nbsp; B</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Total Credit</td>
                    <td class="text-start fw-bold">: &nbsp; &nbsp; 138</td>
                  </tr>
                  <tr>
                    <td class="fw-semibold"> <i class="fa fa-file-text me-2 text-muted"></i>Credit Examped</td>
                    <td class="text-start fw-bold">: &nbsp; &nbsp; 0</td>
                  </tr>

                </tbody>
              </table>

            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-sm-12">
            <div class="bg-white shadow-sm p-3 rounded">
              <h4 class="fw-semibold">Attendance</h4>
              <hr>
              <div class="attendence-progress blue">
                <span class="attendence-progress-left">
                  <span class="attendence-progress-bar"></span>
                </span>
                <span class="attendence-progress-right">
                  <span class="attendence-progress-bar"></span>
                </span>
                <div class="attendence-progress-value">90%</div>
              </div>

              <div class="pt-4">
                <p class="progress-title">Present</p>
                <div class="progress pink">
                  <div class="progress-bar" style="width:90%; background:#ff4b7d;">
                    <div class="progress-value">90%</div>
                  </div>
                </div>

                <p class="progress-title">Absense</p>
                <div class="progress green">
                  <div class="progress-bar" style="width:75%; background:#5fad56;">
                    <div class="progress-value">75%</div>
                  </div>
                </div>

                <p class="progress-title">Permission</p>
                <div class="progress yellow">
                  <div class="progress-bar" style="width:60%; background:#e8d324;">
                    <div class="progress-value">60%</div>
                  </div>
                </div>

              </div>


            </div>
          </div>


        </div>

      </div>
      <div class="col-lg-4 col-md-4 col-sm-12">
        <div class="bg-white shadow-sm rounded p-3 mb-3">
          <h4 class="fw-semibold">Announcements</h4>
          <hr>
          <div class="announcement">
            <ul>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>
              <li><span class="me-2 text-dark">●</span>মানোন্নয়ন পরীক্ষার (Improvement Exam) ফরম পূরণের সময় 20 মে
                পর্যন্ত বৃদ্ধি। ফরম পূরণের সময় 20 মে পর্যন্ত বৃদ্ধি। </li>


            </ul>
          </div>
        </div>

        <div class="bg-white shadow-sm p-3 rounded">
          <h4 class="fw-semibold">Today's Class Update</h4>
          <hr>
          <ul class="list-unstyled small mb-0">
            <li>
              <span class="fw-semibold">Computer Science</span> <br>
              <span class="text-muted me-2">Today, 9:00 AM</span>
            </li>
            <li>
              <span class="fw-semibold">Computer Science</span> <br>
              <span class="text-muted me-2">Today, 9:00 AM</span>
            </li>
            <li>
              <span class="fw-semibold">Computer Science</span> <br>
              <span class="text-muted me-2">Today, 9:00 AM</span>
            </li>
            <li>
              <span class="fw-semibold">Computer Science</span> <br>
              <span class="text-muted me-2">Today, 9:00 AM</span>
            </li>

          </ul>
        </div>

      </div>
    </div>




  </div>

</template>
<script>
export default {
  mounted() {
    // DOM is ready
    this.updateProgressBars();
  },
  methods: {
    updateProgressBars() {
      const spans = document.querySelectorAll('.vertical .progress-fill span');
      spans.forEach(span => {
        const percent = span.textContent.trim(); // "70%"
        const value = parseFloat(percent.replace('%', '')); // 70
        const pTop = (100 - value) + "%";

        const parent = span.parentElement;
        parent.style.height = percent;
        parent.style.top = pTop;
      });
    }
  }
};
</script>
