type dayFormat = "narrow" | "short" | "long";
type MonthFormat = "short" | "long";

export class qCalendar {

  constructor(
		private iconPreviousMonth: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>`,
		private iconNextMonth: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>`,
		private iconPreviousYear: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M197.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L123.31,128ZM72,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,72,40Z"></path></svg>`,
		private iconNextYear: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M149.66,122.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L132.69,128,58.34,53.66A8,8,0,0,1,69.66,42.34ZM184,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,184,40Z"></path></svg>`,
		private iconEdit: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg>`,
		private iconBack: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>`,
		private iconToday: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-64-56a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path></svg>`,
		private iconCancel: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`,
		private iconConfirm: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`,
    private locale: string = 'en-GB',
    private year: number,
    private month: number,
		private date: Date = new Date(),
		private dateFormat: Array = [],
		private weekDays: string[] = [],
		private referenceDate:Date = new Date(1970, 0, 4),
		private weekStartsOnMonday: bool = true
  ) {}

	private getMonthName(format: MonthFormat) {
		return new Intl.DateTimeFormat(this.locale, {
			month: format,
		}).format(this.date);
	}

	private generateWeekDays(format: dayFormat = 'narrow') {
		// const weekDays: string[] = [];
		for (let i = 0; i < 7; i++) {
			let dayOffset = i;
			if (this.weekStartsOnMonday) {
				dayOffset = (i + 1) % 7;
			}
			const date = new Date(this.referenceDate);
			date.setDate(this.referenceDate.getDate() + dayOffset);

			const dayName = new Intl.DateTimeFormat(this.locale, { weekday: format }).format(date);
			this.weekDays.push(dayName);
		}

	}

	private getWeekDay(day: number): string {
		return this.weekDays[day];
	}

  private daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }
		

	initialize(options: []) {
		this.generateWeekDays();;
		
		const div = document.createElement('div');
		div.id = "qCalendar";
		div.classList.add('qCalendar');
		// div.style.display = "none";


    const firstDayOfMonth = new Date(this.year, this.month, 1);
    const lastDayOfMonth = new Date(this.year, this.month + 1, 0);
    const monthDays = this.daysInMonth(this.year, this.month);

		
    // calculate start day index (0=Sunday)
    let startDay = firstDayOfMonth.getDay();
    if (this.weekStartsOnMonday) startDay = (startDay + 6) % 7;

    const prevMonth = this.month === 0 ? 11 : this.month - 1;
    const prevYear = this.month === 0 ? this.year - 1 : this.year;
    const prevMonthDays = this.daysInMonth(prevYear, prevMonth);

    // build array of 42 cells (6 weeks x 7 days)
    const totalCells = 6 * 7;
    const days: { day: number; outside: boolean }[] = [];

    for (let i = 0; i < totalCells; i++) {
      let day: number;
      let outside = false;

      if (i < startDay) {
        // previous month
        day = prevMonthDays - startDay + i + 1;
        outside = true;
      } else if (i >= startDay + monthDays) {
        // next month
        day = i - (startDay + monthDays) + 1;
        outside = true;
      } else {
        // current month
        day = i - startDay + 1;
      }

      days.push({ day, outside });
    }

    // generate HTML with actual days
    div.innerHTML = `
      <form class="qCalendar-inner">
        <input type="hidden" value="${this.month}">
        <input type="hidden" value="${this.year}">
        <div id="qCalendarTable">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr class="qCalendar-header">
              <td><button class="qCalendar-button" type="button">${this.iconPreviousYear}</button></td>
              <td><button class="qCalendar-button" type="button">${this.iconPreviousMonth}</button></td>
              <td colspan="3">${this.getMonthName("short")}, ${this.year}</td>
              <td><button class="qCalendar-button" type="button">${this.iconNextMonth}</button></td>
              <td><button class="qCalendar-button" type="button">${this.iconNextYear}</button></td>
            </tr>
            <tr>
              ${[0,1,2,3,4,5,6].map(i => `<th>${this.getWeekDay(i)}</th>`).join("")}
            </tr>
            ${[0,1,2,3,4,5].map(row =>
              `<tr>${[0,1,2,3,4,5,6].map(col => {
                const cell = days[row * 7 + col];
                return `<td class="${cell.outside ? "outsideMonth" : ""}">
                          <a href="#">${cell.day}</a>
                        </td>`;
              }).join("")}</tr>`
            ).join("")}
          </table>
        </div>
      </form>
    `;

    // append to body or wherever you want
    document.body.appendChild(div);
	}
}
