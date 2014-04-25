class mysql {

  package { [
      'mysql-client',
      'mysql-server',
      'libmysqlclient-dev'
    ]:
    ensure => installed,
  }

  file { '/tmp/schema.sql':
    source => 'puppet:///modules/mysql/schema.sql'
  }

  exec { 'mysql_create_admin':
    subscribe   => [
      Package['mysql-server'],
      Package['mysql-client'],
    ],
    refreshonly => true,
    unless      => "mysqladmin -uroot -padmin status",
    path        => '/bin:/usr/bin',
    command     => "mysqladmin -uroot password admin",
  }

  exec { 'mysql_create_database':
    unless  => '/usr/bin/mysql -u root -padmin seattlereal',
    command => '/usr/bin/mysql -u root -padmin --execute=\'create database seattlereal\'',
    require => Exec['mysql_create_admin']
  }

  exec { 'mysql_create_tables':
    command => '/usr/bin/mysql -u root -padmin seattlereal < /tmp/schema.sql',
    require => File['/tmp/schema.sql'],
  }
}