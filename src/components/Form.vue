<template>
  <div>
    <form class="user-form b5radius" v-on:submit.prevent>
      <div v-if="step <= 3">
        <div class="user-form__positions">
          <div
            class="user-form__position transition"
            v-bind:class="{'user-form__position_active': step === 1}"
          ><p class="b50radius">1</p><span>Информация</span></div>
          <div
            class="user-form__position transition"
            v-bind:class="{'user-form__position_active': step === 2}"
          ><p class="b50radius">2</p><span>Адрес</span></div>
          <div
            class="user-form__position transition"
            v-bind:class="{'user-form__position_active': step === 3}"
          ><p class="b50radius">3</p><span>Документы</span></div>
        </div>

        <div class="user-form__steps" v-if="step === 1">
          <div class="user-form__input b5radius">
            <label
              for="user-form__lastname"
              v-bind:class="{'user-form__input_error': $v.user.lastname.$error}"
            >{{ !$v.user.lastname.$error ? 'Фамилия' : 'Поле обязательно для заполнения' }} <span>*</span>
            </label>
            <input
              type="text"
              class="b5radius"
              id="user-form__lastname"
              placeholder="Введите Фамилию"
              v-model.trim="$v.user.lastname.$model"
            >
          </div>

          <div class="user-form__input b5radius">
            <label
              for="user-form__name"
              v-bind:class="{'user-form__input_error': $v.user.name.$error}"
            >{{ !$v.user.name.$error ? 'Имя' : 'Поле обязательно для заполнения' }} <span>*</span>
            </label>
            <input type="text" class="b5radius" id="user-form__name" placeholder="Введите Имя" v-model.trim="$v.user.name.$model">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__patronymic">Отчество</label>
            <input type="text" class="b5radius" id="user-form__patronymic" placeholder="Введите Отчество" v-model="user.patronymic">
          </div>

          <div class="user-form__input b5radius">
            <label
              for="user-form__datebirth"
              v-bind:class="{'user-form__input_error': $v.user.datebirth.$error}"
            >{{ !$v.user.datebirth.$error ? 'Дата рождения' : 'Поле обязательно для заполнения (дд.мм.гггг)' }} <span>*</span>
            </label>
            <input
              type="text"
              class="b5radius"
              id="user-form__datebirth"
              placeholder="Введите дату рождения"
              v-model.trim="$v.user.datebirth.$model">
          </div>

          <div class="user-form__input b5radius">
            <label
              for="user-form__phonenumber"
              v-bind:class="{'user-form__input_error': $v.user.phonenumber.$error}"
            >{{ !$v.user.phonenumber.$error ? 'Номер телефона' : 'Поле обязательно для заполнения (11 цифр. Начинается с 7)' }} <span>*</span>
            </label>
            <input
              type="text"
              class="b5radius"
              id="user-form__phonenumber"
              placeholder="Введите номер телефона (начиная с 7)"
              v-model.trim="$v.user.phonenumber.$model">
          </div>

          <div class="user-form__floor b5radius">
            <label>Пол</label>
            <label class="b5radius" v-bind:class="{'user-form__floor_active': user.floor === 'man'}">
              <input type="radio" name="user-form__floor" value="man" v-model="user.floor">
              Муж
            </label>
            <label v-bind:class="{'user-form__floor_active': user.floor === 'woman'}">
              <input type="radio" name="user-form__floor" value="woman" v-model="user.floor">
              Жен
            </label>
          </div>

          <div class="user-form__select b5radius">
            <label
              v-bind:class="{'user-form__select_error': !$v.user.group.isValid && changedGroupSelect}"
            >Группа клиентов <span>*</span></label>
            <div>
              <p v-on:click="showGroupSelect = !showGroupSelect">{{ user.group.length ? user.group.join(', ') : 'Не выбрана' }}</p>
              <div class="transition b5radius" v-bind:class="{'user-form__select_show': showGroupSelect}" v-on:click="changeGroup">
                <p v-bind:class="{'user-form__select_active': user.group.includes('VIP')}">VIP</p>
                <p v-bind:class="{'user-form__select_active': user.group.includes('Проблемные')}">Проблемные</p>
                <p v-bind:class="{'user-form__select_active': user.group.includes('ОМС')}">ОМС</p>
              </div>
            </div>
          </div>

          <div class="user-form__select b5radius">
            <label>Лечащий врач</label>
            <div>
              <p v-on:click="showDocrotSelect = !showDocrotSelect">{{ user.doctor.length ? user.doctor : 'Не выбран' }}</p>
              <div class="transition b5radius" v-bind:class="{'user-form__select_show': showDocrotSelect}" v-on:click="changeDoctor">
                <p v-bind:class="{'user-form__select_active': user.doctor === 'Иванов'}">Иванов</p>
                <p v-bind:class="{'user-form__select_active': user.doctor === 'Захаров'}">Захаров</p>
                <p v-bind:class="{'user-form__select_active': user.doctor === 'Чернышева'}">Чернышева</p>
              </div>
            </div>
          </div>

          <div class="user-form__chackbox b5radius">
            <label>Не отправлять СМС</label>
            <label v-bind:class="{'user-form__chackbox_active': user.sms}">
              <input type="checkbox" v-model="user.sms">
              Не отправлять
            </label>
          </div>
        </div>

        <div class="user-form__steps" v-if="step === 2">
          <div class="user-form__input b5radius">
            <label for="user-form__index">Индекс</label>
            <input type="text" class="b5radius" id="user-form__index" placeholder="Введите индекс" v-model.number="user.index">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__country">Страна</label>
            <input type="text" class="b5radius" id="user-form__country" placeholder="Введите страну" v-model="user.country">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__region">Область</label>
            <input type="text" class="b5radius" id="user-form__region" placeholder="Введите область" v-model="user.region">
          </div>

          <div class="user-form__input b5radius">
            <label
              for="user-form__city"
              v-bind:class="{'user-form__input_error': $v.user.city.$error}"
            >{{ !$v.user.city.$error ? 'Город' : 'Поле обязательно для заполнения' }} <span>*</span>
            </label>
            <input
              type="text"
              class="b5radius"
              id="user-form__city"
              placeholder="Введите город"
              v-model.trim="$v.user.city.$model">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__street">Улица</label>
            <input type="text" class="b5radius" id="user-form__street" placeholder="Введите улицу" v-model="user.street">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__home">Дом</label>
            <input type="text" class="b5radius" id="user-form__home" placeholder="Введите номер дома" v-model="user.home">
          </div>
        </div>

        <div class="user-form__steps" v-if="step === 3">
          <div class="user-form__select b5radius">
            <label
              v-bind:class="{'user-form__select_error': !$v.user.document.valid && changedDocumentSelect}"
            >Тип документа <span>*</span></label>
            <div>
              <p v-on:click="showDocumentSelect = !showDocumentSelect">{{ user.document !== '' ? user.document : 'Не выбран' }}</p>
              <div class="transition b5radius" v-bind:class="{'user-form__select_show': showDocumentSelect}" v-on:click="changeDocument">
                <p v-bind:class="{'user-form__select_active': user.document === 'Паспорт'}">Паспорт</p>
                <p v-bind:class="{'user-form__select_active': user.document === 'Свидетельство о рождении'}">Свидетельство о рождении</p>
                <p v-bind:class="{'user-form__select_active': user.document === 'Вод. удостоверение'}">Вод. удостоверение</p>
              </div>
            </div>
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__series">Серия</label>
            <input type="text" class="b5radius" id="user-form__series" placeholder="Введите серию документа" v-model.number="user.series">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__documentnumber">Номер</label>
            <input type="text" class="b5radius" id="user-form__documentnumber" placeholder="Введите номер документа" v-model="user.documentnumber">
          </div>

          <div class="user-form__input b5radius">
            <label for="user-form__issuedby">Кем выдан</label>
            <input type="text" class="b5radius" id="user-form__issuedby" placeholder="Введите кем выдан документ" v-model="user.issuedby">
          </div>

          <div class="user-form__input b5radius">
            <label
              for="user-form__dateissue"
              v-bind:class="{'user-form__input_error': $v.user.dateissue.$error}"
            >{{ !$v.user.dateissue.$error ? 'Дата выдачи' : 'Поле обязательно для заполнения (дд.мм.гггг)' }} <span>*</span>
            </label>
            <input
              type="text"
              class="b5radius"
              id="user-form__dateissue"
              placeholder="Введите дату выдачи документа"
              v-model.trim="$v.user.dateissue.$model">
          </div>
        </div>

        <div class="user-form__panel">
          <button
            class="user-form__back"
            v-if="step > 1"
            v-on:click="back"
          >Назад</button>
          <button
            class="user-form__next b5radius transition"
            v-if="step < 3"
            v-on:click="next"
          >Далее</button>
          <button
            class="user-form__registration b5radius transition"
            v-if="step === 3"
            v-on:click="registration"
          >Зарегестрироваться</button>
        </div>
      </div>
      <div v-else class="registration-successful">
        <img src="../assets/success.svg" alt="successful">
        <h1>Регистрация прошла успешно</h1>
        <button class="b5radius" v-on:click="registrationSuccessful">Ok</button>
      </div>
    </form>

    <div class="step-error b5radius transition"
      v-bind:class="{'step-error_show': showStepError}"
      v-on:click="hideStepError"
      v-on:mouseenter="enterStepError"
      v-on:mouseleave="leaveStepError"
    >
      <p>Поля отмеченные <span>*</span> обязательны для заполнения</p>
    </div>
  </div>
</template>

<script>
const { required, minLength } = require('vuelidate/lib/validators');

export default {
  name: 'Form',
  data: () => ({
    step: 1,
    user: {
      lastname: '',
      name: '',
      patronymic: '',
      datebirth: '',
      phonenumber: '',
      floor: '',
      group: [],
      doctor: '',
      sms: '',
      index: '',
      country: '',
      region: '',
      city: '',
      street: '',
      home: '',
      document: '',
      series: '',
      documentnumber: '',
      issuedby: '',
      dateissue: ''
    },
    showGroupSelect: false,
    changedGroupSelect: false,
    showDocrotSelect: false,
    showDocumentSelect: false,
    changedDocumentSelect: false,
    showStepError: false,
    clearStepError: undefined
  }),
  methods: {
    changeGroup({ ctrlKey, target }) {
      this.changedGroupSelect = true;
      const value = target.textContent;

      if (ctrlKey) {
        const index = this.user.group.indexOf(value);

        if (index + 1) {
          if (this.user.group.length > 1) {
            this.user.group.splice(index, 1);
          } else {
            this.user.group = [];
          }
        } else {
          this.user.group.push(value);
        }
      } else {
        this.user.group = [value];
        this.showGroupSelect = false;
      }
    },
    changeDoctor({ target }) {
      const value = target.textContent;

      if (value === this.user.doctor) {
        this.user.doctor = '';
      } else {
        this.user.doctor = value;
      }

      this.showDocrotSelect = false;
    },
    changeDocument({ target }) {
      this.changedDocumentSelect = true;
      const value = target.textContent;

      if (value === this.user.document) {
        this.user.document = '';
      } else {
        this.user.document = value;
      }

      this.showDocumentSelect = false;
    },
    back() { this.step--; },
    next() {
      if (
        this.step === 1 &&
        !this.$v.user.lastname.$invalid &&
        !this.$v.user.name.$invalid &&
        !this.$v.user.datebirth.$invalid &&
        !this.$v.user.phonenumber.$invalid &&
        this.$v.user.group.isValid
      ) {
        this.step++;
      } else if (this.step === 2 && !this.$v.user.city.$invalid) {
        this.step++;
      }  else {
        this.stepError();
      }
    },
    registration() {
      if (this.step === 3 && this.$v.user.document.valid && this.$v.user.dateissue.validFormat) {
        this.step = 4;
      } else {
        this.stepError();
      }
    },
    registrationSuccessful() {
      this.step = 1;
      this.user.lastname = '';
      this.user.name = '';
      this.user.patronymic = '';
      this.user.datebirth = '';
      this.user.phonenumber = '';
      this.user.floor = '';
      this.user.group = [];
      this.user.doctor = '';
      this.user.sms = '';
      this.user.index = '';
      this.user.country = '';
      this.user.region = '';
      this.user.city = '';
      this.user.street = '';
      this.user.home = '';
      this.user.document = '';
      this.user.series = '';
      this.user.documentnumber = '';
      this.user.issuedby = '';
      this.user.dateissue = '';
      this.showGroupSelect = false;
      this.changedGroupSelect = false;
      this.showDocrotSelect = false;
      this.showDocumentSelect = false;
      this.changedDocumentSelect = false;
      this.showStepError = false;
      this.clearStepError = undefined;
    },
    hideStepError() {
      clearTimeout(this.clearStepError);
      this.showStepError = false;
    },
    stepError() {
      if (!this.showStepError) {
        this.showStepError = true;
        this.clearStepError = setTimeout(() => this.showStepError = false, 3000);
      }
    },
    enterStepError() {
      clearTimeout(this.clearStepError);
    },
    leaveStepError() {
      this.clearStepError = setTimeout(() => this.showStepError = false, 3000);
    }
  },
  validations: {
    user: {
      lastname: {
        required,
        valid: val => /[a-zа-я]{1,50}/i.test(val)
      },
      name: {
        required,
        valid: val => /[a-zа-я]{1,50}/i.test(val)
      },
      datebirth: {
        required,
        validFormat: val => /^([0-3]{1}[1-9]{1})\.([0-1]{1}[0-9]{1})\.[1-9]{1}[0-9]{3}$/.test(val)
      },
      phonenumber: {
        required,
        validFormat: val => /^[7]{1}[0-9]{10}$/.test(val)
      },
      group: {
        isValid: val => val.length >= 1
      },
      city: {
        required,
        minLength: minLength(3),
        valid: val => /[a-zа-я]{3,50}/i.test(val)
      },
      document: {
        valid: val => val !== ''
      },
      dateissue: {
        validFormat: val => /^([0-3]{1}[1-9]{1})\.([0-1]{1}[0-9]{1})\.[1-9]{1}[0-9]{3}$/.test(val)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$fontMain:Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

.user-form {
  max-width:520px;
  min-width:280px;
  height:auto;
  background:#FFF;
  box-shadow:0 0 15px 1px rgba(0,0,0, 0.1);
  overflow:hidden;
  margin:40px auto;
  padding:40px 20px 70px 20px;
  position:relative;
}

.user-form__positions {
  width:100%;
  height:40px;
  background:#F8F8F8;
  display:flex;
  overflow:hidden;
  position:absolute;
  top:0;
  left:0;
}

.user-form__position {
  width:100%;
  height:40px;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  cursor:default;

  & p {
    width:20px;
    height:20px;
    background:#E8E8E8;
    text-align:center;
    line-height:20px;
    color:#FFF;
    font-size:12px;
    font-family:$fontMain;

    @media screen and (max-width:460px) {
      & {
        display:none;
      }
    }
  }

  & span {
    margin-left:10px;
    color:#E8E8E8;
    font-size:12px;
    font-family:$fontMain;

    @media screen and (max-width:460px) {
      & {
        margin-left:0;
      }
    }
  }

  &_active {
    background:#2EA8E8;

    & p {
      background:#FFF;
      color:#2EA8E8;
    }

    & span {
      color:#FFF;
    }
  }
}

.user-form__steps {
  width:100%;
  height:auto;
  overflow:hidden;
}

.user-form__input {
  width:100%;
  height:52px;
  background:#FFF;
  border:2px solid #F8F8F8;
  margin-top:20px;
  position:relative;

  & label {
    width:auto;
    height:20px;
    background:#FFF;
    padding:0 10px;
    line-height:20px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;
    z-index:1;
    position:absolute;
    top:-12px;
    left:10px;

    & span {
      color:#F00;
    }

    &.user-form__input_error {
      color:#F00;
    }
  }

  & input {
    width:100%;
    height:48px;
    background:#FFF;
    padding:0 10px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;
    position:absolute;
    bottom:0;
    left:0;

    &::placeholder {
      color:#E8E8E8;
    }
  }
}

.user-form__floor {
  width:100%;
  height:52px;
  border:2px solid #F8F8F8;
  display:flex;
  margin-top:20px;
  position:relative;

  &_active {
    background:#F8F8F8 !important;
  }

  & label:nth-child(1) {
    width:auto;
    height:20px;
    background:#FFF;
    padding:0 10px;
    line-height:20px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;
    z-index:1;
    position:absolute;
    top:-12px;
    left:10px;
  }

  & label:nth-child(2),
  & label:nth-child(3) {
    width:50%;
    background:#FFF;
    border-radius:3px 0 0 3px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transition:0.1s linear;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;

    &:hover {
      background:#F8F8F8;
    }

    & input {
      margin-right:10px;
    }
  }

  & label:nth-child(3) {
    border-radius:0 3px 3px 0;
  }
}

.user-form__select,
.user-form__select {
  width:100%;
  height:52px;
  border:2px solid #F8F8F8;
  margin-top:20px;
  position:relative;

  & &_show {
    transform:translateY(0);
    visibility:visible;
    opacity:1;
  }

  &_active {
    background:#F8F8F8;
  }

  & label {
    width:auto;
    height:20px;
    background:#FFF;
    padding:0 10px;
    line-height:20px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;
    z-index:1;
    position:absolute;
    top:-12px;
    left:10px;

    & span {
      color:#F00;
    }

    &.user-form__select_error {
      color:#F00;
    }
  }

  & > div {
    width:100%;
    height:48px;
    user-select:none;
    position:relative;

    & > p {
      cursor:pointer;
      padding:0 10px;
      line-height:48px;
      color:#2D2D2D;
      font-size:12px;
      font-family:$fontMain;
    }

    & > div {
      background:#FFF;
      box-shadow:0 0 10px 1px rgba(0,0,0, 0.1);
      transform:translateY(-20px);
      visibility:hidden;
      opacity:0;
      z-index:2;
      position:absolute;
      top:-10px;
      left:10px;

      & p {
        cursor:pointer;
        padding:5px 10px;
        transition:0.1s linear;
        line-height:20px;
        color:#2D2D2D;
        font-size:12px;
        font-family:$fontMain;

        &:hover {
          background:#F8F8F8;
        }
      }
    }
  }
}

.user-form__chackbox {
  width:100%;
  height:52px;
  background:#FFF;
  border:2px solid #F8F8F8;
  display:flex;
  margin-top:20px;
  position:relative;

  &_active {
    background:#F8F8F8 !important;
  }

  & label:nth-child(1) {
    height:20px;
    background:#FFF;
    padding:0 10px;
    line-height:20px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;
    z-index:1;
    position:absolute;
    top:-12px;
    left:10px;
  }

  & label:nth-child(2) {
    width:100%;
    background:#FFF;
    border-radius:3px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    transition:0.1s linear;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;

    &:hover {
      background:#F8F8F8;
    }

    & input {
      margin-right:10px;
    }
  }
}

.user-form__panel {
  width:100%;
  height:60px;
  background:#FFF;
  display:flex;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  position:absolute;
  bottom:0;
  left:0;
}

.user-form__back,
.user-form__next,
.user-form__registration {
  height:40px;
  background:#FFF;
  padding:0 20px;
  cursor:pointer;
  color:#E8E8E8;
  font-size:12px;
  font-family:$fontMain;
}

.user-form__next,
.user-form__registration {
  background:#2EA8E8;
  color:#FFF;

  &:hover {
    background:#249EDE;
  }
}

.step-error {
  height:40px;
  background:#FFF;
  box-shadow:0 0 15px 1px rgba(0,0,0, 0.1);
  overflow:hidden;
  padding:0 10px;
  cursor:pointer;
  opacity:0;
  visibility:hidden;
  transform:translate(-50%, calc(-100% - 10px));
  position:fixed;
  top:10px;
  left:50%;

  & p {
    line-height:40px;
    color:#2D2D2D;
    font-size:12px;
    font-family:$fontMain;

    & span {
      color:#F00;
    }
  }

  &_show {
    opacity:1;
    visibility:visible;
    transform:translate(-50%, 0);
  }
}

.registration-successful {
  width:100%;
  height:250px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  overflow:hidden;
  margin-top:30px;

  & img {
    width:120px;
    height:120px;
  }

  & h1 {
    cursor:default;
    color:#2D2D2D;
    font-size:16px;
    font-family:$fontMain;
  }

  & button {
    height:30px;
    background:#2EA8E8;
    margin-top:20px;
    padding:0 15px;
    cursor:pointer;
    color:#FFF;
    font-size:12px;
    font-family:$fontMain;
  }
}
</style>