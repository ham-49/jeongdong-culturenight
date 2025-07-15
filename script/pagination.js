document.addEventListener("DOMContentLoaded", function () {
  let table = document.getElementById("dataTable");
  let tbody = table.querySelector("tbody");
  let rows = Array.from(tbody.querySelectorAll("tr"));
  let prevBtn = document.getElementById("prevBtn");
  let nextBtn = document.getElementById("nextBtn");
  let pageNumbers = document.getElementById("pageNumbers");

  let rowsPerPage = 10;
  let currentPage = 1;
  let totalPages = Math.ceil(rows.length / rowsPerPage);

  function renderTablePage(page) {
    // tbody 초기화
    tbody.innerHTML = "";

    let start = (page - 1) * rowsPerPage;
    let end = start + rowsPerPage;

    let pageRows = rows.slice(start, end);
    pageRows.forEach(row => tbody.appendChild(row));
  }

  function updatePagination() {
    pageNumbers.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      let btn = document.createElement("button");
      btn.textContent = i;
      btn.classList.add("page-btn");
      if (i === currentPage) btn.classList.add("active");

      btn.addEventListener("click", () => {
        currentPage = i;
        renderTablePage(currentPage);
        updatePagination();
      });

      pageNumbers.appendChild(btn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }

  // 이전 버튼 클릭
  prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderTablePage(currentPage);
      updatePagination();
    }
  });

  // 다음 버튼 클릭
  nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderTablePage(currentPage);
      updatePagination();
    }
  });

  // 초기 렌더링
  renderTablePage(currentPage);
  updatePagination();
});
