<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* components/theme-toggle.twig */
class __TwigTemplate_fa4df39bc1a8413ffc3e7fc53ef761a4e1a8801b5954812acb6ab08754f872f8 extends Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div class=\"flex flex-col justify-center items-center bg-gray-900 bg-opacity-30 rounded-full cursor-pointer w-4 h-8\" title=\"";
        echo twig_escape_filter($this->env, call_user_func_array($this->env->getFunction('translate')->getCallable(), ["toggle_theme"]), "html", null, true);
        echo "\" v-on:click=\"toggleTheme\">
    <div class=\"flex justify-center items-center bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out\" v-bind:class=\"{ '-translate-y-2': lightMode, 'translate-y-2': darkMode }\">
        <i class=\"fas fa-lightbulb fa-xs\" v-bind:class=\"{ 'text-gray-600': darkMode, 'text-yellow-400': lightMode }\"></i>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "components/theme-toggle.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "components/theme-toggle.twig", "D:\\webdev\\konspektas\\site\\_DirectoryLister-3.7.6\\app\\views\\components\\theme-toggle.twig");
    }
}
