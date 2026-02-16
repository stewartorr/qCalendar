type dayFormat = "narrow" | "short" | "long";
type MonthFormat = "short" | "long";

export class soCalendar {

  constructor(
		private iconPreviousMonth: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path></svg>`,
		private iconNextMonth: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path></svg>`,
		private iconPreviousYear: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M197.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L123.31,128ZM72,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,72,40Z"></path></svg>`,
		private iconNextYear: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M149.66,122.34a8,8,0,0,1,0,11.32l-80,80a8,8,0,0,1-11.32-11.32L132.69,128,58.34,53.66A8,8,0,0,1,69.66,42.34ZM184,40a8,8,0,0,0-8,8V208a8,8,0,0,0,16,0V48A8,8,0,0,0,184,40Z"></path></svg>`,
		private iconEdit: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,73.37,182.63,28.69a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H216a8,8,0,0,0,0-16H115.32l112-112A16,16,0,0,0,227.32,73.37ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.69,147.32,64l24-24L216,84.69Z"></path></svg>`,
		private iconBack: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path></svg>`,
		private iconToday: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-64-56a16,16,0,1,1-16-16A16,16,0,0,1,144,152Z"></path></svg>`,
		private iconCancel: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`,
		private iconConfirm: string = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path></svg>`,
    private locale: string = 'en-GB',
    private year: number = new Date().getFullYear(),
    private month: number = new Date().getMonth(),
    private day: number = new Date().getDay(),
    private date: Date = new Date(),
    private selector: string = '.date-picker',
    private dateFormat: string = "DD/MM/YYYY",
    private targetElement: HTMLInputElement,
    private today: Date = new Date(),
    private referenceDate: Date = new Date(1970, 0, 4),
    private weekDays: [string, string][],
    private weekStartsOnMonday: boolean = true
  ) {}

	private getMonthName(month: number, format: MonthFormat = 'short'): string {
		return new Intl.DateTimeFormat(this.locale, {
			month: format,
		}).format(new Date(2000, month, 1));
	}

  private generateWeekDays(format: dayFormat = 'narrow') {
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      let dayOffset = i;
      if (this.weekStartsOnMonday) dayOffset = (i + 1) % 7;
      const date = new Date(this.referenceDate);
      date.setDate(this.referenceDate.getDate() + dayOffset);
      this.weekDays.push([
        new Intl.DateTimeFormat(this.locale, { weekday: format }).format(date),
        new Intl.DateTimeFormat(this.locale, { weekday: 'long' }).format(date)
      ]);
    }
  }

	private getWeekDay(day: number): string {
    const [full, abbr] = this.weekDays[day];
    return `<abbr title="${abbr}">${full}</abbr>`;
	}

  private daysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
  }

	initialize(options: []) {
		this.generateWeekDays();
		const dialog = document.createElement('dialog');
		dialog.id = "soCalendar";
		dialog.classList.add('socalendar');
    dialog.innerHTML = ` 
      <div class="socalendar-backdrop"></div>
      <div class="socalendar-inner">
        <div class="socalendar-header">
          <div class="socalendar-label-prev">
            <button id="soCalendar-back" class="socalendar-button socalendar-back" type="button">${this.iconBack}</button>
            <button id="soCalendar-prev-year" class="socalendar-button socalendar-prev-year" type="button">${this.iconPreviousYear}</button>
            <button id="soCalendar-prev-month" class="socalendar-button socalendar-prev-month" type="button">${this.iconPreviousMonth}</button>
          </div>
          <div class="socalendar-label">
            <button id="soCalendar-label-month" class="socalendar-button-label" type="button">
              <span data-before="${this.getMonthName(this.date.getMonth()-1, "short")}" data-after="${this.getMonthName(this.date.getMonth()+1, "short")}">${this.getMonthName(this.date.getMonth(), "short")}</span>
            </button>
            <button id="soCalendar-label-year" class="socalendar-button-label" type="button">
              <span data-before="${this.year-1}" data-after="${this.year+1}">${this.year}</span>
            </button>
          </div>
          <div class="socalendar-label-next">
            <button id="soCalendar-next-month" class="socalendar-button socalendar-next-month" type="button">${this.iconNextMonth}</button>
            <button id="soCalendar-next-year" class="socalendar-button socalendar-next-year" type="button">${this.iconNextYear}</button>
          </div>
        </div>
        <div class="socalendar-content-wrapper">
          <div id="soCalendar-content" class="socalendar-content"></div>
        </div>
        <div id="soCalendar-footer" class="socalendar-footer">
          <button id="soCalendar-cancel" class="socalendar-button" type="button">${this.iconCancel}</button>
          <button id="soCalendar-today" class="socalendar-button" type="button" disabled>${this.iconToday}</button>
          <button id="soCalendar-confirm" class="socalendar-button" type="button">${this.iconConfirm}</button>
        </div>
      </div>`;
    document.body.appendChild(dialog);
    this.addListeners();
    this.generateDatePicker();
	}

  updateMonthLabel() {
    const monthLabel = document.getElementById('soCalendar-label-month');
    if (monthLabel instanceof HTMLButtonElement) monthLabel.innerHTML = `<span 
      data-before="${this.getMonthName(this.month-1, "short")}" 
      data-after="${this.getMonthName(this.month+1, "short")}">
        ${this.getMonthName(this.month, "short")}
      </span>`;
  }

  updateMonth(change: number): void {
    const classToggle = change > 0 ? 'next' : 'prev' ;
    const monthLabel = document.getElementById('soCalendar-label-month');
    
    if (this.month + change < 0) {
      this.month = 11;
      this.updateYear(-1);
    } else if (this.month + change > 11) {
      this.month = 0;
      this.updateYear(1);
    } else {
      this.month += change;
    }

    this.updateDate();
    this.generateDatePicker();

    if (monthLabel instanceof HTMLButtonElement) {
      monthLabel.addEventListener('transitionend', () => {
        monthLabel.classList.remove(classToggle);
        this.updateMonthLabel();
      });
      monthLabel.classList.add(classToggle);
    }
  }

  updateYearLabel() {
    const yearLabel = document.getElementById('soCalendar-label-year');
    if (yearLabel instanceof HTMLButtonElement) yearLabel.innerHTML = `<span data-before="${this.year-1}" data-after="${this.year+1}">${this.year}</span>`;
  }

  updateYear(change: number): void {
    // TODO: Check if allowed
    const classToggle = change > 0 ? 'next' : 'prev' ;
    const yearLabel = document.getElementById('soCalendar-label-year');
    this.year += change;
    this.generateDatePicker();
    if (yearLabel instanceof HTMLButtonElement) {
      yearLabel.addEventListener('transitionend', () => {
        yearLabel.classList.remove(classToggle);
        this.updateDate();
        this.updateYearLabel()
      });
      yearLabel.classList.add(classToggle);
    }
  }

  private updateDate() {
    this.date = new Date(this.year, this.month, this.day);
    const todayBtn = document.getElementById('soCalendar-today');
    if (todayBtn instanceof HTMLButtonElement) {
      todayBtn.disabled = !(this.date.getFullYear() != this.today.getFullYear() ||  this.date.getMonth() != this.today.getMonth());
    }
  }

  private parseDateString(value: string): Date | false {
    if (!value) return false;

    // Normalize separator (allow / or -)
    const parts = value.split(/[\/\-]/);

    if (parts.length !== 3) return false;

    let day: number;
    let month: number;
    let year: number;

    switch (this.dateFormat) {
      case "DD/MM/YYYY":
        day = Number(parts[0]);
        month = Number(parts[1]);
        year = Number(parts[2]);
        break;

      case "MM/DD/YYYY":
        month = Number(parts[0]);
        day = Number(parts[1]);
        year = Number(parts[2]);
        break;

      case "YYYY/MM/DD":
        year = Number(parts[0]);
        month = Number(parts[1]);
        day = Number(parts[2]);
        break;

      default:
        return false;
    }

    // Basic numeric validation
    if (
      !Number.isInteger(day) ||
      !Number.isInteger(month) ||
      !Number.isInteger(year)
    ) {
      return false;
    }

    // Basic range checks
    if (year < 1000 || year > 9999) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;

    // Create date
    const date = new Date(year, month - 1, day);

    // Strict validation (prevents rollover issues)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return false;
    }

    return date;
  }

	addListeners(): void {
    const soCalendar = document.getElementById("soCalendar");
    const backCalendar = document.getElementById("soCalendar-back");
    const prevYear = document.getElementById("soCalendar-prev-year");
    const prevMonth = document.getElementById("soCalendar-prev-month");
    const nextMonth = document.getElementById("soCalendar-next-month");
    const nextYear = document.getElementById("soCalendar-next-year");
    const closeCalendar = document.getElementById("soCalendar-cancel");
    const confirmCalendar = document.getElementById("soCalendar-confirm");
    const today = document.getElementById("soCalendar-today");
    const monthPicker = document.getElementById("soCalendar-label-month");
    const yearPicker = document.getElementById("soCalendar-label-year");
    const inputElements = document.querySelectorAll(this.selector);

    // Watch for click outside the calendar, closeCalendar
    document.addEventListener("pointerdown", (e) => {
      if (!soCalendar) return;
      if (!soCalendar.contains(e.target)) {
        this.closeCalendar();
      }
    });

    inputElements.forEach((input) => {
      input.addEventListener('click', (event) => { 
        const element = event.currentTarget as HTMLInputElement;
        if (element && element.dataset.socalendarTarget) {
          const target = document.getElementById(element.dataset.socalendarTarget);
          if (target) {
            target.classList.add('socalendar-target');
            this.targetElement = target;
          }
        } else {
          input.classList.add('socalendar-target');
          this.targetElement = element;
        }

        // TODO ----------------------------------------------------------------
        // Work out the date they have selected already and update our date
        if (this.targetElement.type === 'date' && this.targetElement.value.trim() != '') {
          this.date = new Date(this.targetElement.value);
        } else {
          const currentDate = this.parseDateString(this.targetElement.value.trim());
          if (currentDate instanceof Date) {
            this.date = currentDate;
          } else {
            this.date = this.today;
          }
        }
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.day = this.date.getDate();
        this.updateDate();
        this.generateDatePicker();
        this.updateMonthLabel();
        this.updateYearLabel();
        soCalendar.showModal();
      });
    });

    // Back button show when picking a month or year
    if (backCalendar instanceof HTMLButtonElement) backCalendar.addEventListener('click', () => {
      this.generateDatePicker();
    });
    
    // Go to previous year
    if (prevYear instanceof HTMLButtonElement) prevYear.addEventListener('click', () => { 
      this.updateYear(-1) 
    });
    
    // Go to previous month
    if (prevMonth instanceof HTMLButtonElement) prevMonth.addEventListener('click', () => { 
      this.updateMonth(-1) 
    });
    
    // Go to next month
    if (nextMonth instanceof HTMLButtonElement) nextMonth.addEventListener('click', () => { 
      this.updateMonth(1) 
    });
    
    // Go to next year
    if (nextYear instanceof HTMLButtonElement) nextYear.addEventListener('click', () => { 
      this.updateYear(1); 
    });
    
    // Close calendar
    if (closeCalendar instanceof HTMLButtonElement) closeCalendar.addEventListener('click', () => { 
      this.closeCalendar() 
    });
    
    // Confirm calendar selection TODO
    if (confirmCalendar instanceof HTMLButtonElement) confirmCalendar.addEventListener('click', () => { 
      this.closeCalendar() 
    });
    
    // Update calendar picker to today
    if (today instanceof HTMLButtonElement) today.addEventListener('click', () => {
      this.year = this.today.getFullYear();
      this.month = this.today.getMonth();
      this.day = this.today.getDate(); 
      this.updateDate();
      this.updateYearLabel();
      this.updateMonthLabel();
      this.generateDatePicker();
    });
    
    // Open month picker
    if (monthPicker instanceof HTMLButtonElement) monthPicker.addEventListener('click', () => { 
      this.generateMonthPicker();
    });
    
    // Open year picker
    if (yearPicker instanceof HTMLButtonElement) yearPicker.addEventListener('click', () => { 
      this.generateYearPicker();
    });
  }

  private setDate(date: Date): void {
    if (this.targetElement.type == 'date') {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      this.targetElement.value = `${yyyy}-${mm}-${dd}`;
    } else {
      this.targetElement.value = date.toLocaleDateString(this.locale);
    }
    this.closeCalendar();
  }

  closeCalendar(): void {
    const soCalendar = document.getElementById('soCalendar');
    if (soCalendar instanceof HTMLDialogElement) {
      soCalendar.close();
    }
  }

  isOpen(): bool {
    const soCalendar = document.getElementById('soCalendar');
    return (soCalendar && soCalendar.classList.contains('socalendar-loaded'));
  }

  show(): void {
    if (this.isOpen()) return;
    const soCalendar = document.getElementById('soCalendar');
    if (soCalendar instanceof HTMLElement) {
      soCalendar.classList.add('socalendar-loaded');
    }    
  }

  private toggleElements(ids: string[], hide: bool = false, cssclass: string = 'socalendar-hidden'): void {
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.classList.toggle(cssclass, hide);
    });
  }

  private generateYearPicker(year?: number | null): void {
    const div: HTMLElement | null = document.getElementById("soCalendar-content");
    if (!div) return;

    if (!year) year = this.year;

    this.toggleElements(['soCalendar-back'], false);
    this.toggleElements(['soCalendar-footer', 
      'soCalendar-content-month',
      'soCalendar-prev-year',
      'soCalendar-prev-month',
      'soCalendar-next-month',
      'soCalendar-next-year'
    ], true);    

    const decadeStart = Math.floor(year / 10) * 10;

    div.innerHTML = `
    <div class="socalendar-year-picker">
      <div class="socalendar-year-picker-scroller">
        <button type="button" id="soCalendar-decade-prev">${this.iconPreviousMonth}</button>
        <span class="socalendar-year-picker-label">${decadeStart} &ndash; ${decadeStart+9}</span>
        <button type="button" id="soCalendar-decade-next">${this.iconNextMonth}</button>
      </div>
      <ol class="socalendar-year-picker">
        ${Array.from({ length: 10 }, (_, i) => {
          const year = decadeStart + i;
          return `
            <li>
              <button type="button" class="socalendar-button ${this.year === year?"selected":""} socalendar-select-year" data-year="${year}">
                ${year}
              </button>
            </li>
          `;
        }).join("")}
      </ol>
    </div>
  `;

    // Add button event listeners
    const prevDecade = document.getElementById('soCalendar-decade-prev');
    const nextDecade = document.getElementById('soCalendar-decade-next');

    if (prevDecade instanceof HTMLButtonElement) {
      prevDecade.addEventListener('click', (event) => {
        // this.year-=10;
        // this.updateDate();
        this.generateYearPicker(decadeStart - 10);
      });
    }
  
    if (nextDecade instanceof HTMLButtonElement) {
      nextDecade.addEventListener('click', (event) => {
        // this.year+=10;
        // this.updateDate();
        this.generateYearPicker(decadeStart + 10);
      });
    }

    // Add button event listeners
    const calendarButtons = document.querySelectorAll<HTMLButtonElement>("#soCalendar button.socalendar-select-year");
    calendarButtons.forEach((b) => {
      b.addEventListener('click', (event) => {
        const button = event.currentTarget;
        if (button) {
          const year = Number(button.dataset.year);
          if (year) {
            this.year = year;
            this.updateDate();
            this.updateYearLabel();
            this.generateMonthPicker();
          }
        }
      });
    });
  }

  // This updates the main calendar content area to show month picker
  private generateMonthPicker():void {
    const div: HTMLElement | null = document.getElementById('soCalendar-content');
    if (!div) return;

    this.toggleElements(['soCalendar-back'], false);
    this.toggleElements(['soCalendar-footer', 
      'soCalendar-prev-year',
      'soCalendar-prev-month',
      'soCalendar-next-month',
      'soCalendar-next-year'
    ], true);
    
    div.innerHTML = `<ol class="socalendar-month-picker">
      ${[0,1,2,3,4,5,6,7,8,9,10,11]
      .map(i => `
        <li>
          <button type="button" class="socalendar-button soCalendar-select-month" data-month="${i}">
            ${this.getMonthName(i, 'long')}
          </button>
        </li>
      `).join("")}
    </ol>
    `;

    // Add button event listeners
    const calendarButtons = document.querySelectorAll<HTMLButtonElement>("#soCalendar button.soCalendar-select-month");
    calendarButtons.forEach((b) => {
      b.addEventListener('click', (event) => {
        const button = event.currentTarget;
        if (button) {
          const month = Number(button.dataset.month);
          if (month) {
            this.month = month;
            this.updateDate();
            this.updateMonthLabel();
            this.generateDatePicker();
          }
        }
      });
    });
  }

  // Generate a datepicker which contains previous, current and next month for scrolling
	generateDatePicker(): void {
    this.toggleElements(['soCalendar-back'], true);
    this.toggleElements([
      'soCalendar-footer', 
      'soCalendar-prev-year',
      'soCalendar-prev-month',
      'soCalendar-next-month',
      'soCalendar-next-year'
    ], false);

    const div: HTMLElement | null = document.getElementById(`soCalendar-content`);
    if (!div) return;
    
    div.innerHTML = '';

    // Compute correct month/year for this iteration
    const baseDate = new Date(this.year, this.month, 1);
    const viewYear = baseDate.getFullYear();
    const viewMonth = baseDate.getMonth();

    const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
    const monthDays = this.daysInMonth(viewYear, viewMonth);

    let startDay = firstDayOfMonth.getDay();
    if (this.weekStartsOnMonday) startDay = (startDay + 6) % 7;

    const prevMonthDate = new Date(viewYear, viewMonth - 1, 1);
    const prevMonth = prevMonthDate.getMonth();
    const prevYear = prevMonthDate.getFullYear();
    const prevMonthDays = this.daysInMonth(prevYear, prevMonth);

    const totalCells = 6 * 7;

    const days: {
      day: number;
      month: number;
      year: number;
      outside: boolean;
      isCurrent: boolean;
    }[] = [];

    for (let i = 0; i < totalCells; i++) {
      let day: number;
      let month = viewMonth;
      let year = viewYear;
      let outside = false;

      if (i < startDay) {
        day = prevMonthDays - startDay + i + 1;
        month = prevMonth;
        year = prevYear;
        outside = true;

      } else if (i >= startDay + monthDays) {
        const nextMonthDate = new Date(viewYear, viewMonth + 1, 1);
        day = i - (startDay + monthDays) + 1;
        month = nextMonthDate.getMonth();
        year = nextMonthDate.getFullYear();
        outside = true;

      } else {
        day = i - startDay + 1;
      }

      const isCurrent =
        day === this.day &&
        month === this.month &&
        year === this.year;

      days.push({ day, month, year, outside, isCurrent });
    }

    div.insertAdjacentHTML('beforeend', `
      <table class="socalendar-date-picker" cellpadding="0" cellspacing="0">
        <caption class="socalendar-visually-hidden">
          ${this.getMonthName(viewMonth, "long")} ${viewYear}
        </caption>
        <tr>
          ${[0,1,2,3,4,5,6].map(i => `
            <th>${this.getWeekDay(i)}</th>
          `).join("")}
        </tr>
        ${[0,1,2,3,4,5].map(row =>
          `<tr>
            ${[0,1,2,3,4,5,6].map(col => {
              const cell = days[row * 7 + col];
              const classes = [
                "socalendar-button",
                "soCalendar-select-date",
                cell.outside ? "outsideMonth" : "",
                cell.isCurrent ? "isCurrent" : ""
              ].filter(Boolean).join(" ");

              return `
                <td>
                  <button
                    type="button"
                    class="${classes}"
                    data-year="${cell.year}"
                    data-month="${cell.month}"
                    data-day="${cell.day}"
                  >
                    ${cell.day}
                  </button>
                </td>
              `;
            }).join("")}
          </tr>`
        ).join("")}
      </table>
    `);

    // Add button event listeners
    const calendarButtons = document.querySelectorAll<HTMLButtonElement>("#soCalendar button.soCalendar-select-date");
    calendarButtons.forEach((b) => {
      b.addEventListener('click', (event) => {
        const button = event.currentTarget;
        if (button) {
          const year = button.dataset.year;
          const month = button.dataset.month;
          const day = button.dataset.day;
          if (year && month && day) {
            this.setDate(new Date(year, month, day));
          }
        }
      });
    });
  }
}
