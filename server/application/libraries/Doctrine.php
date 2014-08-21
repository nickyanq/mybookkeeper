<?php

use Doctrine\Common\ClassLoader;
use Doctrine\ORM\Tools\Setup;
use Doctrine\ORM\EntityManager;

class Doctrine {

    /**
     * @var EntityManager $em
     */
    protected $em = null;

    /**
     *
     * @var Doctrine
     */
    private static $instance;

    /**
     * Singleton pattern, returneaza conexiunea
     * @return EntityManger
     */
    public static function getInstance() {

        if (!self::$instance) {
            self::$instance = new Doctrine();
        }
        return self::$instance;
    }

    public function Doctrine() {
        require_once APPPATH . 'libraries/vendor/autoload.php';
        $doctrineClassLoader = new ClassLoader('Doctrine', APPPATH . 'libraries');
        $doctrineClassLoader->register();
        $entitiesClassLoader = new ClassLoader('Mbk', rtrim(APPPATH, "/"));
        $entitiesClassLoader->register();
    }

    private function initDB() {
        require_once APPPATH . 'config/database.php';
		
        // Database connection information
        $dbParams = array(
            'driver' => 'pdo_mysql',
            'user' => 'root',
            'password' => '',
            'host' => 'localhost',
            'dbname' => '_mbk'
        );

        $path = array(APPPATH . 'Mbk/Entities');


        $config = Doctrine\ORM\Tools\Setup::createAnnotationMetadataConfiguration($path, true);

        $config->addEntityNamespace("Entities", 'Mbk\Entities');

        // $config->setResultCacheImpl(new \Doctrine\Common\Cache\ApcCache());
        // $config->setQueryCacheImpl(new \Doctrine\Common\Cache\ApcCache());
        // $config->setMetadataCacheImpl(new \Doctrine\Common\Cache\ApcCache());
        //$config->setProxyDir("NeoMvc/Proxy");
        //$config->setProxyNamespace("Proxy");
        $config->setAutoGenerateProxyClasses(true);

        $em = EntityManager::create($dbParams, $config);

        try {

//        $this->updateSchema($em);
        } catch (\Exception $e) {
            echo $e->getMessage();
        }

        return $em;
    }

    public function getEm() {
        if (!$this->em)
            $this->em = $this->initDB();
        return $this->em;
    }

    public function updateSchema($em) {

        $tool = new \Doctrine\ORM\Tools\SchemaTool($em);

        $classes = array(
            $em->getClassMetadata("Entities:User"),
//            $em->getClassMetadata("Entities:Item"),
//            $em->getClassMetadata("Entities:ItemImage"),
//            $em->getClassMetadata("Entities:ItemStats"),
//            $em->getClassMetadata("Entities:Category"),
//            $em->getClassMetadata("Entities:ItemCategories"),
//            $em->getClassMetadata("Entities:Order"),
//            $em->getClassMetadata("Entities:Company"),
//            $em->getClassMetadata("Entities:Invoice"),
//            $em->getClassMetadata("Entities:OrderItem"),
//            $em->getClassMetadata("Entities:OrderVoucher"),
//            $em->getClassMetadata("Entities:SimplePage"),
//            $em->getClassMetadata("Entities:ItemTags"),
//            $em->getClassMetadata("Entities:NeoCart"),
//            $em->getClassMetadata("Entities:AclRole"),
//            $em->getClassMetadata("Entities:Acl"),
//            $em->getClassMetadata("Entities:AclResource"),
//            $em->getClassMetadata("Entities:CartItem"),
//            $em->getClassMetadata("Entities:PartnerNewsletter"),
//            $em->getClassMetadata("Entities:City"),
//            $em->getClassMetadata("Entities:SubscriptionOption"),
//            $em->getClassMetadata("Entities:SubscriptionOptionOrder"),
//            $em->getClassMetadata("Entities:ActiveOption"),
//            $em->getClassMetadata("Entities:Attribute"),
//            $em->getClassMetadata("Entities:AttributeValue"),
//            $em->getClassMetadata("Entities:ItemVariant"),
//            $em->getClassMetadata("Entities:NewsletterSubscriber"),
//            $em->getClassMetadata("Entities:JobLog")
        );

        $tool->updateSchema($classes);
        exit("done");
    }

}
?>

