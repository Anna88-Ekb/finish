"use strict";
//ПЕРЕМЕННЫЕ
//переменная количества участников и завершивших тест
let students = 0;
let total_students = 100;
//переменные верных ответов
const true_answer1 = 1.6,
  true_answer2 = [1, 2],
  true_answer3 = 11.25,
  true_answer4 = 2,
  true_answer5 = 335;
const answers = [true_answer1, true_answer2, true_answer3, true_answer4, true_answer5];
//секция задачи
const task_total_text = document.querySelector(".task_total_text");
const task_total_need = document.querySelector(".task_total_need");
//секция результата
const arrows = document.querySelectorAll(".schools span");
const schools = document.querySelectorAll(".schools table");
let schools_tbody = document.querySelectorAll(".schools table tbody");
//меню
const menu = document.querySelectorAll(".menu_list li");
const program_section = document.querySelectorAll(".program section");
//форма теста
//фамилия теста
const test_family = document.querySelector(".test_family");
//задания теста
const test_zadanie3 = document.querySelector(".test_zadanie3");
const test_zadanie4 = document.querySelector(".test_zadanie4");
const test_zadanie5 = document.querySelector(".test_zadanie5");
//переменные - кнопки
const add_student = document.querySelector(".add_student");
const get_random_student = document.querySelector(".get_random_student");
const add_answers_test = document.querySelector(".add_answers_test");
const get_cvs = document.querySelector(".get_cvs");
//блок с вводом данных
const data = document.querySelector(".data");
const data_move = document.querySelector(".data_move");
const data_close = document.querySelector(".data_close_img");
const data_minimize = document.querySelector(".data_minimize_img");
const form_data = document.querySelector(".form_data");
//подсказки к заданиям формы
const data_input = document.querySelectorAll(".data_zadanie input");
const data_family = document.querySelector(".data_family");
//миникнопки
const change_students_save = document.querySelector(".change_students_save");
const change_students_btn = document.querySelector(".change_students_btn");
const change_students_block = document.querySelector(".change_students_block");
const remove_table = document.querySelector(".remove_tables");
const remove_tables = document.querySelectorAll(".remove_table button");
const remove_student = document.querySelector(".remove_student");
//админ-панель
const admin = document.querySelector(".admin");
const admin_form_btn = document.querySelector(".admin_form_btn");
const admin_icons = document.querySelectorAll(".admin_panel img");
const [lpanel_open_form, lpanel_move_form, lpanel_close_form] = admin_icons;
//------------------функции---------------------
//удалить студентов по двойному клику в таблицах с резульатами
function removeStudent(type) {
  const trs = document.querySelectorAll(".schools tbody tr");
  for (let tr = 0; tr < trs.length; tr++) {
    if (type === true) {
      trs[tr].style.backgroundColor = "#fee7ce";
      trs[tr].style.cursor = "pointer";
      trs[tr].addEventListener("dblclick", deletePerson);
    } else {
      trs[tr].style = null;
      trs[tr].removeEventListener("dblclick", deletePerson);
    }
  }
}

remove_student.addEventListener("click", function () {
  removeStudent(true);
});
//выношу фунцию, чтобы отвязать обработчик события при выходе из админ. панели
function deletePerson() {
  this.remove();
  students = countStudents(schools_tbody);
  displayFinishTest(students);
}
//изменение количества студентов
change_students_save.addEventListener("click", function changeStudentAmount() {
  const change_students_input = document.querySelector(".change_students_input");
  const change_students_error = document.querySelector(".change_students_error");
  let str = deleteSpace(change_students_input.value);
  if (str.length === 0) {
    change_students_error.textContent = "Вы не ввели значение";
  } else if (isNaN(+str)) {
    change_students_error.textContent = "Только числовые значения";
  } else if (+str < 0) {
    change_students_error.textContent = "Только положительные значения";
  } else if (+str < countStudents(schools_tbody) && countStudents(schools_tbody) > 0) {
    change_students_error.textContent = "Участников не может быть меньше завершивших тест";
  } else if (parseInt(+str) !== parseFloat(+str)) {
    change_students_error.textContent = "Допустимо только целое число";
  } else if (+str > 300) {
    change_students_error.textContent = "Максимальное количество участников допустимо 300";
  } else {
    total_students = +str;
    task_total_need.textContent = total_students;
    change_students_error.textContent = "Изменения успешно внесены";
  }
});
// меняет старое тело таблицы на пустое новое
function removeTable(index) {
  let old_tbody = schools[index].querySelector("tbody");
  let new_tbody = document.createElement("tbody");
  schools[index].replaceChild(new_tbody, old_tbody);
  schools_tbody = document.querySelectorAll(".schools table tbody");
  displayFinishTest(countStudents(schools_tbody));
}
// удаление данных всех таблиц
remove_table.addEventListener("click", function () {
  for (let i = 0; i < schools.length; i++) {
    removeTable(i);
  }
});
// удаление данных конкретной таблицы
for (let i = 0; i < remove_tables.length; i++) {
  remove_tables[i].addEventListener("click", removeTable.bind(null, i));
}
//меню и отображение видимости блоков секций
for (let i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", function () {
    let active = this.parentElement.querySelector(".active");
    for (let elem of program_section) {
      if (!elem.classList.contains("disp_none")) {
        elem.classList.add("disp_none");
        break;
      }
    }
    active.classList.remove("active");
    this.classList.add("active");
    program_section[i].classList.remove("disp_none");
  });
}
// перемещение формы по экрану по нажатию мыши
data_move.addEventListener("mousedown", dragElementMouse(data));
function dragElementMouse(elmnt) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  data_move.onmousedown = dragMouseDown;
  function dragMouseDown(e) {
    // позиция мышки при нажатии
    pos3 = e.pageX;
    pos4 = e.pageY;
    document.onmouseup = closeDragElement;
    //вызов функции при движении мышки:
    document.onmousemove = elementDrag;
  }
  function elementDrag(e) {
    // расчет новой позиции курсора
    pos1 = pos3 - e.pageX;
    pos2 = pos4 - e.pageY;
    pos3 = e.pageX;
    pos4 = e.pageY;
    // присваивание новой позиции элементу
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
  }
  function closeDragElement() {
    //остановка движения
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
//перещение формы по экрану по касанию (для сенсорных экранов)
data_move.addEventListener("touchstart", touchStart);
let pos1 = 0,
  pos2 = 0,
  pos3 = 0,
  pos4 = 0;
function touchStart(e) {
  // Получаем первый палец, который начал касание
  let touch = e.changedTouches[0];
  // сохраняем начальную позицию касания
  pos3 = touch.pageX;
  pos4 = touch.pageY;
  // привязываем события к другим методам
  data_move.addEventListener("touchmove", touchMove);
  data_move.addEventListener("touchend", touchEnd);
}
function touchMove(e) {
  // Предотвращаем прокрутку страницы
  e.preventDefault();
  // Получаем первый палец, который двигается
  let touch = e.changedTouches[0];
  // расчет новой позиции курсора
  pos1 = pos3 - touch.pageX;
  pos2 = pos4 - touch.pageY;
  pos3 = touch.pageX;
  pos4 = touch.pageY;
  // присваивание новой позиции элементу
  data.style.top = data.offsetTop - pos2 + "px";
  data.style.left = data.offsetLeft - pos1 + "px";
}
function touchEnd(e) {
  // удаляем привязанные события
  data_move.removeEventListener("touchmove", touchMove);
  data_move.removeEventListener("touchend", touchEnd);
}
//свернуть форму ввода данных
let check_data_collapse = false;
function dataСollapse() {
  data.style.padding > "0px" ? (data.style.padding = "0px") : (data.style.padding = "35px");
  form_data.classList.toggle("disp_none");
  !check_data_collapse ? (check_data_collapse = true) : (check_data_collapse = false);
}
data_minimize.addEventListener("click", dataСollapse);
//закрыть форму ввода данных
data_close.addEventListener("click", function () {
  data.classList.toggle("disp_none");
});
//вернуть форму ввода данных в центр по двойному клику
function reset_position_form() {
  data.style.top = "500px";
  data.style.left = "50%";
}
//миникнопки формы ввода данных
change_students_btn.addEventListener("click", function () {
  change_students_block.classList.toggle("hide");
});
//свернуть/развернуть школы
for (let i = 0; i < arrows.length; i++) {
  arrows[i].addEventListener("click", function () {
    schools[i].classList.toggle("disp_none");
    this.querySelector("img").classList.toggle("img_transform");
  });
}
//вернуть цвет селекту
function black_color() {
  this.style.color = "black";
}
//проверка ввода англ. букв, символов, повторов в поле с фамилией
function checkFamilyInput() {
  //проверка ввода англ. букв
  //получить вводимый символ console.log(this.value[this.value.length - 1]);
  const f_name = document.querySelector(`.${this.closest("form").className} input[placeholder='Фамилия']`);
  if (/[A-Za-z]/.test(f_name.value[f_name.value.length - 1]) === true && f_name.value != "") {
    return displayTextError(f_name, "Только русские буквы");
  }
  //проверка ввода специальных символов
  if (/[\d\,\_\"\@\?\!\:\$\/\\\|\&\*\~\`\#\№\;\%\^\(\)\{\}\[\]\<\>\+\=]/.test(f_name.value[f_name.value.length - 1]) === true && f_name.value != "") {
    return displayTextError(f_name, "Допустимы дефис, апостроф и точка");
  }
  //проверка ввода одинаковых символов
  if (
    f_name.value[f_name.value.length - 1] === f_name.value[f_name.value.length - 2] &&
    f_name.value[f_name.value.length - 1] === f_name.value[f_name.value.length - 3] &&
    f_name.value[f_name.value.length - 2] === f_name.value[f_name.value.length - 3] &&
    f_name.value != ""
  ) {
    return displayTextError(f_name, "Недопустимы тройные повторы символов");
  }
}
// отобразить ошибку проверки ввода англ. букв, символов, повторов в поле с фамилией
function displayTextError(f_name, text) {
  const error_text = f_name.parentElement.querySelector(`.${f_name.classList[0]}_error_text`);
  const error_container = error_text.parentElement;
  f_name.value = f_name.value.slice(0, f_name.value.length - 1);
  f_name.classList.add("disp_none");
  error_container.classList.remove("disp_none");
  error_text.textContent = text;
  error_text.nextElementSibling.addEventListener("click", function () {
    error_container.classList.add("disp_none");
    f_name.classList.remove("disp_none");
  });
}
//запустить проверку вводимых символов в поле ввода фамилии
test_family.addEventListener("input", checkFamilyInput);
data_family.addEventListener("input", checkFamilyInput);
//проверка ввода буквенных символов в поля с ответами на задания
function checkTestStrType() {
  if (/[A-Za-z|а-яёА-ЯЁ]/.test(this.value[this.value.length - 1]) === true && this.value != "") {
    let error_text = document.querySelector(`.${this.classList}_error`);
    error_text.textContent = "буквы недопустимы";
    this.value = this.value.slice(0, this.value.length - 1);
    setTimeout(function () {
      error_text.textContent = "";
    }, 5000);
  }
}
test_zadanie3.addEventListener("input", checkTestStrType);
test_zadanie4.addEventListener("input", checkTestStrType);
test_zadanie5.addEventListener("input", checkTestStrType);

// отобразить подсказку верного ответа в форме данных
for (let i = 0; i < data_input.length; i++) {
  data_input[i].addEventListener("input", function () {
    if (/[A-Za-z|а-яёА-ЯЁ]/.test(this.value[this.value.length - 1]) === true && this.value != "") {
      let error_text = document.querySelector(`.${this.classList}_error`);
      error_text.textContent = "буквы недопустимы";
      this.value = this.value.slice(0, this.value.length - 1);
      setTimeout(function () {
        if (typeof answers[i] != "object") {
          error_text.textContent = `Ответ: ${answers[i]}`;
        } else {
          error_text.textContent = `Ответ: ${answers[i].join(", ")}`;
        }
      }, 3000);
    }
  });
}

//ф-я удалить лишние допустимые символы в фамилии
function deleteSymbols(str) {
  let arr = str.split("");
  while (arr[0] == " " || arr[0] == "-" || arr[0] == "." || arr[0] == "’" || arr[0] == "'") {
    arr.splice(0, 1);
  }
  while (
    arr[arr.length - 1] == " " ||
    arr[arr.length - 1] == "-" ||
    arr[arr.length - 1] == "." ||
    arr[arr.length - 1] == "’" ||
    arr[arr.length - 1] == "'"
  ) {
    arr.splice(arr.length - 1, 1);
  }
  let i = 0;
  while (i < arr.length) {
    if (
      (arr[i] == " " && arr[i + 1] == " ") ||
      (arr[i] == "." && arr[i + 1] == ".") ||
      (arr[i] == "-" && arr[i + 1] == "-") ||
      (arr[i] == "’" && arr[i + 1] == "’") ||
      (arr[i] == "'" && arr[i + 1] == "'")
    ) {
      arr.splice(i, 1);
      i = 0;
    } else {
      i++;
    }
  }
  return arr.join("");
}
//функция удалить лишние пробелы
function deleteSpace(str) {
  let arr = str.split("");
  while (arr[0] == " ") {
    arr.splice(0, 1);
  }
  while (arr[arr.length - 1] == " ") {
    arr.splice(arr.length - 1, 1);
  }
  let i = 0;
  while (i < arr.length) {
    if (arr[i] == " " && arr[i + 1] == " ") {
      arr.splice(i, 1);
      i = 0;
    } else {
      i++;
    }
  }
  return arr.join("");
  //console.log(str.replace(/ +/g, " ").trim());
}
//функция удалить все пробелы
function deleteAllSpace(str) {
  let arr = str.split("");
  let i = 0;
  while (i < arr.length) {
    if (arr[i] == " ") {
      arr.splice(i, 1);
      i = 0;
    } else {
      i++;
    }
  }
  return arr.join("");
}
// Перевести первую букву в верхний регистр
function upperCase(str) {
  let arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    if (i === 0 || arr[i - 1] == " " || arr[i - 1] == "'" || arr[i - 1] == "’" || arr[i - 1] == "-" || arr[i - 1] == ".") {
      arr[i] = arr[i].toUpperCase();
    }
  }
  return arr.join("");
}
//функция, запрещающая ставить два нуля подряд
function checkFirstNull() {
  let str = deleteSpace(this.value);
  if (str[0] == "0" && str[1] != ".") {
    this.value = str.slice(0, 1);
  }
}
test_zadanie3.addEventListener("input", checkFirstNull);
test_zadanie4.addEventListener("input", checkFirstNull);
test_zadanie5.addEventListener("input", checkFirstNull);

//функция, меняющая запятую на точку
function changeСomma(str) {
  let arr = str.split("");
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == ",") {
      arr[i] = ".";
    }
  }
  return arr.join("");
}
// получение кличества записей строк таблиц
function countStudents(schools) {
  let sum = 0;
  for (let tables of schools) {
    sum += tables.querySelectorAll("tr").length;
  }
  return sum;
}
//вывод участвующих на страницу задачи
function displayFinishTest(num) {
  task_total_text.textContent = num;
}
//вывод студенту результата его ответов
function displayCountAnswers(num) {
  const count_answers_window = document.querySelector(".count_answers_window");
  const count_answers_window_close = document.querySelector(".count_answers_window img");
  const count_answers_window_res = document.querySelector(".count_answers_window span");
  count_answers_window.classList.remove("disp_none");
  count_answers_window_close.addEventListener("click", function () {
    count_answers_window.classList.add("disp_none");
  });
  count_answers_window_res.textContent = num;
  setTimeout(function () {
    count_answers_window.classList.add("disp_none");
  }, 5000);
}
//отобразить авторизованному пользователю о том, что достигнуто максимальное количество участвующих
function displayMaxStudent() {
  const add_student_true = document.querySelector(".add_student_true");
  const close = document.querySelector(".add_student_true img");
  add_student_true.classList.remove("disp_none");
  close.addEventListener("click", function () {
    add_student_true.classList.add("disp_none");
  });
}
//создает новую строку таблицу с данными ученика
function createNewPerson(arr) {
  let new_tr = document.createElement("tr");
  for (let elem of arr) {
    let new_td = document.createElement("td");
    new_td.innerHTML = elem;
    new_tr.appendChild(new_td);
  }
  return new_tr;
}
//проверка фамилии
function checkMinFname(input) {
  if (deleteSymbols(input.value).length < input.minLength) {
    displayTextError(input, "Минимум две буквы");
    return false;
  }
  return true;
}
//проверка выбора номера школы
function checkSchoolNum(input) {
  if (input.selectedIndex == 0) {
    input.style.color = "red";
    input.addEventListener("click", black_color);
    return false;
  }
  return true;
}
//скролл к полям фамилии и номеру школы при ошибках
function scrollToError(family, school, fam_inp) {
  if (!family || !school || fam_inp.classList.contains("disp_none")) {
    window.scrollTo({
      top: fam_inp.parentElement.clientHeight,
      behavior: "smooth",
    });
  }
}
//обрабатывает данные полей ввода ответов на задачи
function getAnswer(input) {
  if (input.tagName == "INPUT") {
    if (input.type == "text" && !input.classList.contains("select_type")) {
      let zadanie = changeСomma(deleteSpace(input.value));
      if (zadanie.length === 0) {
        return "не решено";
      } else {
        return zadanie;
      }
    } else {
      let zadanie = deleteAllSpace(input.value);
      if (zadanie.length === 0) {
        return "не решено";
      } else {
        zadanie = zadanie.split(",");
        return zadanie;
      }
    }
  }
  if (input.tagName != "INPUT") {
    let elems = input.querySelectorAll("[name]");
    //если радиокнопка
    if (elems[0].type == "radio") {
      for (let radio = 0; radio < elems.length; radio++) {
        if (elems[radio].checked) {
          return elems[radio].value;
        }
        if (!elems[radio].checked && radio == elems.length - 1) {
          return "не решено";
        }
      }
    }
    // если чекбокс
    if (elems[0].type == "checkbox") {
      let zadanie = [];
      for (let check = 0; check < elems.length; check++) {
        if (elems[check].checked) {
          zadanie.push(elems[check].value);
        }
      }
      if (zadanie.length === 0) {
        return "не решено";
      } else {
        return zadanie;
      }
    }
  }
}
//считает правильные ответы
function countTrueAnswer(st_answers, answers) {
  let sum = 0;
  //посчитать правильные ответы из массива
  function countTrueFromArr(arr1, arr2) {
    if (arr1.length == arr2.length) {
      let sum = 0;
      arr1.sort();
      arr2.sort();
      for (let i = 0; i < arr2.length; i++) {
        if (arr1[i] == arr2[i]) {
          sum++;
        }
      }
      return sum == arr2.length ? 1 : 0;
    }
    return 0;
  }
  for (let i = 0; i < st_answers.length; i++) {
    if (typeof st_answers[i] != "object" && typeof answers[i] != "object") {
      if (st_answers[i] == answers[i]) {
        sum++;
      }
    } else {
      sum += countTrueFromArr(st_answers[i], answers[i]);
    }
  }
  return sum;
}
//сортировка строк таблицы
function sortingTable(trs) {
  let sort_arr = Array.from(trs).sort(function (a, b) {
    if (a.lastElementChild.innerHTML === b.lastElementChild.innerHTML) {
      return a.firstElementChild.innerHTML > b.firstElementChild.innerHTML ? 1 : -1;
    }
    return a.lastElementChild.innerHTML < b.lastElementChild.innerHTML ? 1 : -1;
  });
  return sort_arr;
}
// обработка ответов студентов и внесение сведений в таблицу с результатами + сортировка
function getAnswersStudent() {
  //получение формы - родителя у кнопки
  const form = document.querySelector(`.${this.closest("form").classList}`);
  //получение полей ввода
  const inputs = document.querySelectorAll(`.${this.closest("form").className} [data-input]`);
  let person = [];
  let count_answers = 0;
  //скрол до ввода школы и фамилии, если поля для ввода не заполнены или есть ошибки в вводе
  scrollToError(checkMinFname(inputs[0]), checkSchoolNum(inputs[1]), inputs[0]);
  //если фамилия корректа и номер школы выбран
  if (
    checkMinFname(inputs[0]) &&
    checkSchoolNum(inputs[1]) &&
    countStudents(schools_tbody) < total_students &&
    !inputs[0].classList.contains("disp_none")
  ) {
    //добавляет фамилию в массив
    person.push(upperCase(deleteSymbols(inputs[0].value.toLowerCase())));
    // добавляет ответы на задания в массив
    for (let i = 2; i < inputs.length; i++) {
      person.push(getAnswer(inputs[i]));
    }
    //считает количество ответов
    count_answers = countTrueAnswer(person.slice(1), answers);
    //добавляет количество ответов в массив
    person.push(count_answers);
    //сформировать из массива строку и добавить запись в таблицу
    schools_tbody[inputs[1][inputs[1].selectedIndex].text - 1].appendChild(createNewPerson(person));
    //----------------------сортировка  таблицы----------------------------*/
    //получить строки таблицы, куда была добавлена запись
    let trs = schools_tbody[inputs[1][inputs[1].selectedIndex].text - 1].querySelectorAll("tr");
    //размещает копию отсортированных данных в таблицу
    schools_tbody[inputs[1][inputs[1].selectedIndex].text - 1].append(...sortingTable(trs));
    //размещает количество прошедших тест в секцию задачи
    students = countStudents(schools_tbody);
    displayFinishTest(students);
    //вывести прошедшему тест кол-во верных ответов
    if (form.classList.contains("form_test")) {
      displayCountAnswers(count_answers);
    }
    //сбросить введенные значения в форму
    form.reset();
  }
  //вывести, что достигнуть максимальное количество студентов, если вводит авторизованный пользователь
  if (form.classList.contains("form_data") && students == total_students) {
    displayMaxStudent();
  }
}
//создание отчета о результатах тестирования в формате utf8
function exportData() {
  //Собираем данные таблиц
  let csv_data = [];
  //смена символов для корректного отображения в csv файле
  function change_symbols_forCVS(str) {
    let arr = str.split("");
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == ".") {
        arr[i] = ",";
        continue;
      }
      if (arr[i] == ",") {
        arr[i] = " ";
        continue;
      }
      if (arr[i] == "№") {
        arr[i] = "#";
      }
    }
    return arr.join("");
  }
  for (let i = 0; i < schools.length; i++) {
    csv_data.push(change_symbols_forCVS(schools[i].parentElement.firstElementChild.innerHTML));
    let rows = schools[i].querySelectorAll("tr");
    for (let j = 0; j < rows.length; j++) {
      let cols = rows[j].querySelectorAll("td,th");
      let csvrow = [];
      for (let k = 0; k < cols.length; k++) {
        csvrow.push(change_symbols_forCVS(cols[k].innerHTML));
      }
      csv_data.push(csvrow.join(";"));
    }
  }
  csv_data = csv_data.join("\n"); //string
  //Делаем перекодировку символов (убираем "иероглифы")
  let uint8 = new Uint8Array(csv_data.length);
  for (let i = 0; i < csv_data.length; i++) {
    let x = csv_data.charCodeAt(i);
    if (x >= 1040 && x <= 1103) {
      // Символы А..Я а..я
      x -= 848;
    } else if (x == 1025) {
      // Символ Ё
      x = 168;
    } else if (x == 1105) {
      // Символ ё
      x = 184;
    }
    uint8[i] = x;
  }
  
  //Скачать полученный файл
  /* let file  = new Blob(["\ufeff",contents], {type: 'data:text/csv; charset=utf-8;' }); */
  let file = new Blob([uint8], { type: 'text/csv' });
  let link = document.createElement("a");
  let url = window.URL.createObjectURL(file);
  link.href = url;
  link.download = "Результаты_тестирования.csv";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
//---------------кнопки--------------------------------
//внести данные о студентах
add_student.addEventListener("click", getAnswersStudent);
add_answers_test.addEventListener("click", getAnswersStudent);
//сформировать отчет
get_cvs.addEventListener("click", exportData);
//получить случайного студента из массива файла random.js
get_random_student.addEventListener("click", function () {
  const random = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const student = random(file_students);
  const form_inputs = document.querySelectorAll(".form_data [data-input]");
  if (form_inputs.length === student.length) {
    for (let i = 0; i < form_inputs.length; i++) {
      form_inputs[i].value = student[i];
    }
  }
});
//вернуть перемещенную форму +- в центр
data.addEventListener("dblclick", reset_position_form);
lpanel_move_form.addEventListener("click", reset_position_form);
//открыть форму ввода данных(если ее закрыть по крестику)
lpanel_open_form.addEventListener("click", function () {
  if (data.classList.contains("disp_none")) {
    data.classList.toggle("disp_none");
  }
});
//поменять панель входа на панель управления панелью данными
admin_form_btn.addEventListener("click", function entranceAdmin() {
  const admin_login = document.querySelector(".admin_login");
  const admin_password = document.querySelector(".admin_password");
  if (admin_login.value == "admin" && admin_password.value == "1234") {
    admin.classList.add("disp_none");
    admin.nextElementSibling.classList.remove("disp_none");
    data.classList.remove("disp_none");
    this.parentElement.reset();
  } else {
    this.style.backgroundColor = "#dd2005";
    this.style.borderColor = "#fff";
    this.style.color = "#fff";
    this.value = "Неверно";
    const resStyle = () => {
      this.style = null;
      this.value = "Войти";
    };
    setTimeout(resStyle, 1800);
  }
});
//закрыть левую панель и выйти из формы данных
lpanel_close_form.addEventListener("click", function () {
  admin.classList.remove("disp_none");
  admin.nextElementSibling.classList.add("disp_none");
  data.classList.add("disp_none");
  admin_form_btn.style = null;
  admin_form_btn.value = "Войти";
  removeStudent(false);
  if (check_data_collapse) {
    dataСollapse();
  }
});
