function convertToInteger(value) {
  return parseInt(value.replace(/\D/g, ""), 10);
}

function highlightOdometer() {
  const odometerElements = document.querySelectorAll('li[data-type="Odometer"]');

  odometerElements.forEach((odometerElement) => {
    const listing = odometerElement.closest('div.listing-item.card.standard');
    const titleElement = listing.querySelector('div.card-body h3 a.js-encode-search');

    if (odometerElement && titleElement) {
      const odometerValue = convertToInteger(odometerElement.textContent);
      const titleText = titleElement.textContent.trim();
      const yearMatch = titleText.match(/\b\d{4}\b/);

      if (yearMatch) {
        const carYear = parseInt(yearMatch[0], 10);
        const estimatedMileage = (new Date().getFullYear() - carYear) * 15000;

        if (estimatedMileage >= odometerValue) {
          odometerElement.style.color = 'limegreen';
        } else {
          odometerElement.style.color = 'red';
        }
      }
    }
  });
}

// Initial highlighting
highlightOdometer();

// Use MutationObserver to react to changes in the DOM
const observer = new MutationObserver(() => {
  highlightOdometer();
});

observer.observe(document.body, { subtree: true, childList: true });