<template>
  <section class="builder-section">
    <header class="section-header">
      <div class="section-title-row">
        <div class="timeline-dot" />
        <span class="section-title">Paste LinkedIn Search URL</span>
      </div>
    </header>

    <div class="section-body">
      <div class="panel-head">
        <div class="helper-row">
          <v-icon size="16" color="#3666EE">mdi-linkedin</v-icon>
          <span>
            Find your target audience with
            <a href="#">LinkedIn Search</a>
            or
            <a href="#">Sales Navigator</a>
            or
            <a href="#">Post URL</a>
            or
            <a href="#">Group URL</a>
          </span>
        </div>

        <button type="button" class="guide-link">
          <v-icon size="12" color="#3666EE">mdi-information-outline</v-icon>
          <span>Search Guide</span>
        </button>
      </div>

      <div class="search-row">
        <div class="search-input-wrap">
          <input
            type="text"
            class="search-input"
            placeholder="https://www.linkedin.com/search/results/people/?keywords="
          />
        </div>

        <v-btn color="primary" class="validate-btn">Validate</v-btn>
      </div>

      <div class="helper-note">
        <span class="note-dot">
          <span class="note-dot-inner" />
        </span>
        <span>Paste the search URL directly from Linkedin</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.builder-section {
  position: relative;
  margin-top: 16px;
  padding-left: 14px;
}

.section-header {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  background: #fff;
}

.section-title-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.timeline-dot {
  position: absolute;
  left: -21px;
  top: 15px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid #3666ee;
  background: #fff;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  color: #5e5873;
}

.section-body {
  margin-top: 15px;
  margin-left: 4px;
  min-height: 154px;
  padding: 27px 22px 20px 22px;
  border: 1px solid #ebe9f1;
  border-radius: 5px;
  background: #fff;
}

.panel-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.helper-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  max-width: 690px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  color: #5e5873;
}

.helper-row a {
  color: #3666ee;
}

.guide-link {
  margin-top: 3px;
  border: 0;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #3666ee;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  line-height: 18px;
  text-decoration: underline;
  white-space: nowrap;
}

.search-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.search-input-wrap {
  flex: 1;
  min-height: 38px;
  border: 1px solid #d8d6de;
  border-radius: 5px;
  background: #fff;
  display: flex;
  align-items: center;
}

.search-input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  padding: 0 12px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  line-height: 24px;
  color: #5e5873;
}

.search-input::placeholder {
  color: #b9b9c3;
}

.validate-btn {
  width: 89px;
  height: 42px;
  border-radius: 5px;
  text-transform: none;
  letter-spacing: 0.4px;
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.helper-note {
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  line-height: 140%;
  color: #a6a4ad;
}

.note-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(54, 102, 238, 0.34);
  display: inline-grid;
  place-items: center;
}

.note-dot-inner {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #3666ee;
}

@media (max-width: 960px) {
  .panel-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-row {
    flex-direction: column;
    align-items: stretch;
  }

  .validate-btn {
    width: 100%;
  }
}
</style>
