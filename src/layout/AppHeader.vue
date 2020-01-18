<template>
    <header class="header-global">
        <base-nav class="navbar-main" transparent type="" effect="light" expand>
            <router-link slot="brand" class="navbar-brand mr-lg-5" to="/">
                <img src="../../public/img/brand/white.png" alt="logo">
            </router-link>

            <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                <li class="nav-item">
                    <a class="nav-link nav-link-icon"
                       target="_blank" rel="noopener" data-toggle="tooltip" title="Star us on Github">
                        <i class="fa fa-github"></i>
                        <span class="nav-link-inner--text d-lg-none">Github</span>
                    </a>
                </li>
                <li class="nav-item d-none d-lg-block ml-lg-4">
                    <a target="_blank" rel="noopener"
                       class="btn btn-neutral btn-icon">
                        <span class="btn-inner--icon">
                          <i class="fa fa-cloud-upload mr-2"></i>
                        </span>
                        <span class="nav-link-inner--text">Upload</span>
                    </a>
                </li>
            </ul>
        </base-nav>
    </header>
</template>
<script>
import BaseNav from "../components/BaseNav";
import BaseDropdown from "../components/BaseDropdown";
import CloseButton from "../components/CloseButton";

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
