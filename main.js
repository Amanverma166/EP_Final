// ✅ Job Info Data (Button-based Roles)
const jobData = {
  developer: {
    title: "Frontend Developer",
    description: "Build user interfaces using HTML, CSS, and JavaScript.",
    image: "images/job1.png"
  },
  designer: {
    title: "UI/UX Designer",
    description: "Design user-friendly interfaces and improve user experience.",
    image: "images/job2.png"
  },
  marketing: {
    title: "Marketing Specialist",
    description: "Manage digital campaigns, SEO, and content strategy.",
    image: "images/job3.png"
  },
  banking: {
    title: "Bank Officer",
    description: "Handle financial transactions and assist with customer banking needs.",
    image: "images/job4.png"
  },
  teaching: {
    title: "School Teacher",
    description: "Instruct students in subjects like Math, Science, or English.",
    image: "images/job5.png"
  },
  law: {
    title: "Legal Associate",
    description: "Support legal research, draft documents, and assist in legal proceedings.",
    image: "images/job6.png"
  },
  engineering: {
    title: "Mechanical Engineer",
    description: "Design, develop, and maintain mechanical systems.",
    image: "images/job7.png"
  },
  sales: {
    title: "Sales Executive",
    description: "Promote products and close sales with customers.",
    image: "images/job8.png"
  }
};

// ✅ Image Gallery for Role Buttons
const galleryImagesByRole = {
  developer: ["images/feature1.jpg", "images/feature2.jpg", "images/feature3.jpg"],
  designer: ["images/feature4.jpg", "images/feature5.jpg"],
  marketing: ["images/feature6.jpg", "images/feature7.jpg", "images/feature8.jpg"]
};

// ✅ Image Data for Advanced Filters
const filteredImageData = [
  {
    location: "bangalore",
    type: ["fulltime"],
    salary: 60000,
    distance: 5,
    img: "images/job1.png"
  },
  {
    location: "mumbai",
    type: ["remote", "night"],
    salary: 40000,
    distance: 15,
    img: "images/job2.png"
  },
  {
    location: "remote",
    type: ["remote"],
    salary: 80000,
    distance: 0,
    img: "images/job3.png"
  }
];

// ✅ DOM Ready
document.addEventListener("DOMContentLoaded", function () {
  const gallery = document.getElementById("gallery");
  const buttons = document.querySelectorAll(".filter-btn");

  const jobImage = document.getElementById("job-image");
  const jobTitle = document.getElementById("job-title");
  const jobDescription = document.getElementById("job-description");

  // ✅ Show Images Based on Role Button
  function showImagesByRole(type) {
    gallery.innerHTML = "";
    if (!galleryImagesByRole[type]) return;

    galleryImagesByRole[type].forEach((url) => {
      const img = document.createElement("img");
      img.src = url;
      img.onerror = () => {
        img.src = "https://via.placeholder.com/250x150?text=Image+Missing";
      };
      img.alt = type;
      img.style.width = "100%";
      img.style.maxWidth = "250px";
      img.style.margin = "10px";
      img.style.borderRadius = "10px";
      gallery.appendChild(img);
    });
  }

  // ✅ Update Job Info Box
  function updateJob(jobKey) {
    const job = jobData[jobKey];
    if (!job || !jobImage || !jobTitle || !jobDescription) return;

    jobImage.classList.add("fade-in");
    const tempImg = new Image();
    tempImg.src = job.image;
    tempImg.onload = () => {
      jobImage.src = job.image;
      jobTitle.textContent = job.title;
      jobDescription.textContent = job.description;
      setTimeout(() => jobImage.classList.remove("fade-in"), 400);
    };
  }

  // ✅ Attach Button Events (Left-side filters)
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-type");
      if (jobData[key]) updateJob(key);
      if (galleryImagesByRole[key]) showImagesByRole(key);
    });
  });

  // ✅ Initial Load
  const keys = Object.keys(jobData);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  updateJob(randomKey);
  showImagesByRole("developer");

  // ✅ Advanced Filters (Distance, Salary, Type)
  const distanceFilter = document.getElementById("distanceFilter");
  const salaryFilter = document.getElementById("salaryFilter");
  const distanceValue = document.getElementById("distanceValue");
  const salaryValue = document.getElementById("salaryValue");
  const locationFilter = document.getElementById("locationFilter");
  const applyFilters = document.getElementById("applyFilters");

  // ✅ Range UI values
  if (distanceFilter && distanceValue) {
    distanceFilter.oninput = () => {
      distanceValue.textContent = `${distanceFilter.value} km`;
    };
  }

  if (salaryFilter && salaryValue) {
    salaryFilter.oninput = () => {
      salaryValue.textContent = `₹${parseInt(salaryFilter.value).toLocaleString()}`;
    };
  }

  // ✅ Render Filtered Images
  function renderImages(data) {
    if (!gallery) return;
    gallery.innerHTML = "";

    if (data.length === 0) {
      gallery.innerHTML = "<p>No jobs match the selected filters.</p>";
      return;
    }

    data.forEach((job) => {
      const img = document.createElement("img");
      img.src = job.img;
      img.alt = "Job Image";
      img.onerror = () => {
        img.src = "https://via.placeholder.com/250x150?text=No+Image";
      };
      gallery.appendChild(img);
    });
  }

  // ✅ Apply Advanced Filters
  if (applyFilters) {
    applyFilters.addEventListener("click", () => {
      const selectedLocation = locationFilter?.value || "";
      const selectedDistance = parseInt(distanceFilter?.value || "0");
      const selectedSalary = parseInt(salaryFilter?.value || "0");
      const selectedTypes = Array.from(document.querySelectorAll(".job-type:checked")).map(cb => cb.value);

      const filtered = filteredImageData.filter(job => {
        const matchLocation = !selectedLocation || job.location === selectedLocation;
        const matchDistance = job.distance <= selectedDistance;
        const matchSalary = job.salary <= selectedSalary;
        const matchType = selectedTypes.length === 0 || selectedTypes.some(type => job.type.includes(type));
        return matchLocation && matchDistance && matchSalary && matchType;
      });

      renderImages(filtered);
    });
  }

  // ✅ Initial Load for Advanced Filter section
  renderImages(filteredImageData);
});
