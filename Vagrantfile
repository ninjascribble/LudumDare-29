# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "precise64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/precise/current/precise-server-cloudimg-amd64-vagrant-disk1.box"
  config.vm.network :forwarded_port, guest: 80, host: 8081
  config.vm.network :forwarded_port, guest: 3000, host: 3000
  config.vm.synced_folder "", "/vagrant", disabled: true
  config.vm.synced_folder "", "/var/src"

  config.vm.provision :puppet do |puppet|
    puppet.manifests_path = "config/puppet/manifests"
    puppet.module_path = "config/puppet/modules"
    puppet.manifest_file  = "init.pp"
    puppet.options="--verbose --debug"
  end
end

module VagrantPlugins
    module PM2

        class Plugin < Vagrant.plugin(2)
            name 'vagrant-pm2'
            description ''
            command :app do
                argv = ARGV[1..-1]
                case argv[0]
                    when 'start'
                        Start
                    when 'restart'
                        Restart
                    when 'stop'
                        Stop
                    when 'list'
                        List
                    when 'log'
                        Log
                end
            end
        end

        class Start < Vagrant.plugin(2, :command)
          def execute
            command = 'pm2 start /var/src/app/app.js -i max'
            with_target_vms(nil, :single_target => true) do |vm|
              vm.action(:ssh_run, :ssh_run_command => command)
              return 0
            end
          end
        end

        class Restart < Vagrant.plugin(2, :command)
          def execute
            command = 'pm2 gracefulReload all'
            with_target_vms(nil, :single_target => true) do |vm|
              vm.action(:ssh_run, :ssh_run_command => command)
              return 0
            end
          end
        end

        class Stop < Vagrant.plugin(2, :command)
          def execute
            command = 'pm2 stop all'
            with_target_vms(nil, :single_target => true) do |vm|
              vm.action(:ssh_run, :ssh_run_command => command)
              return 0
            end
          end
        end

        class List < Vagrant.plugin(2, :command)
          def execute
            command = 'pm2 list'
            with_target_vms(nil, :single_target => true) do |vm|
              vm.action(:ssh_run, :ssh_run_command => command)
              return 0
            end
          end
        end

        class Log < Vagrant.plugin(2, :command)
          def execute
            command = 'pm2 logs'
            with_target_vms(nil, :single_target => true) do |vm|
              vm.action(:ssh_run, :ssh_run_command => command)
              return 0
            end
          end
        end
    end
end