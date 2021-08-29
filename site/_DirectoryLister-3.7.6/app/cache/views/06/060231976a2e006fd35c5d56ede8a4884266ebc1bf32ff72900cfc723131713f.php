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

/* components/readme.twig */
class __TwigTemplate_38101f995b7026e7d671fd10263ca6c39f24f0a2d24689a55e2d59033aec83d6 extends Template
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
        echo "<div id=\"readme\" class=\"my-4 ";
        echo ((call_user_func_array($this->env->getFunction('config')->getCallable(), ["readmes_first"])) ? ("order-first") : (null));
        echo "\" style=\"scroll-margin-top: 6rem;\">
    <div class=\"rounded-lg overflow-hidden shadow-md\">
        <header class=\"flex items-center bg-blue-600 px-4 py-3 text-white dark:bg-purple-700\">
            <i class=\"fas fa-book fa-lg pr-3\"></i> README.md
        </header>

        <article class=\"bg-gray-100 rounded-b-lg px-4 py-8 sm:px-6 md:px-8 lg:px-12 dark:bg-gray-900 dark:border-0 ";
        // line 7
        echo (((0 === twig_compare(twig_get_attribute($this->env, $this->source, ($context["readme"] ?? null), "getExtension", [], "any", false, false, false, 7), "md"))) ? ("markdown") : ("font-mono"));
        echo "\" v-pre>
            ";
        // line 8
        if ((0 === twig_compare(twig_get_attribute($this->env, $this->source, ($context["readme"] ?? null), "getExtension", [], "any", false, false, false, 8), "md"))) {
            // line 9
            echo "                ";
            echo call_user_func_array($this->env->getFunction('markdown')->getCallable(), [twig_get_attribute($this->env, $this->source, ($context["readme"] ?? null), "getContents", [], "any", false, false, false, 9)]);
            echo "
            ";
        } else {
            // line 11
            echo "                ";
            echo nl2br(twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["readme"] ?? null), "getContents", [], "any", false, false, false, 11), "html", null, true));
            echo "
            ";
        }
        // line 13
        echo "        </article>
    </div>
</div>
";
    }

    public function getTemplateName()
    {
        return "components/readme.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  65 => 13,  59 => 11,  53 => 9,  51 => 8,  47 => 7,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "components/readme.twig", "D:\\webdev\\konspektas\\site\\_DirectoryLister-3.7.6\\app\\views\\components\\readme.twig");
    }
}
