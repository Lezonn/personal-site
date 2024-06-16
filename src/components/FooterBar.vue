<template>
  <footer class="footer d-flex justify-center align-center flex-column">
    <v-container fluid>
      <v-row no-gutters>
        <v-col class="footer_copyright" offset="1" cols="5">
          ©️ 2024 Leonard Zonaphan • Jakarta
        </v-col>
        <v-col class="footer_social" offset="1" cols="4" sm="1" md="1">
          <ul class="footer_social_list d-flex flex-column">
            <li class="footer_social_list_elsewhere">Elsewhere</li>
            <li>
              <a
                href="https://www.linkedin.com/in/leonard-zonaphan/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Linkedin
              </a>
            </li>
            <li>
              <a href="https://github.com/Lezonn" target="_blank" rel="noopener noreferrer">
                Github
              </a>
            </li>
          </ul>
        </v-col>
        <v-col class="footer_contact" offset="1" cols="5" sm="2" md="2">
          <ul class="footer_contact_list d-flex flex-column">
            <li class="footer_contact_list_contact">Contact</li>
            <li>
              <a href="mailto:lezonmail@gmail.com" target="_blank" rel="noopener noreferrer">
                lezonmail@gmail.com
              </a>
            </li>
          </ul>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/variables';

.footer {
  background-color: $--color-background-secondary;
  padding: $--spacing-xl 0 $--spacing-m;

  &_copyright {
    color: $--color-dark-light;
  }

  &_social_list,
  &_contact_list {
    &_elsewhere,
    &_contact {
      color: $--color-text-primary;
      font-weight: 600;
    }

    & > li {
      margin-bottom: $--spacing-xs;

      & > a {
        color: $--color-dark-light;
      }
    }
  }
}

@media (max-width: 768px) {
  .footer {
    &_copyright {
      display: none;
    }
  }
}
@media (min-width: 769px) {
  /* Styles for desktops */
}
</style>
